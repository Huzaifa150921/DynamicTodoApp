import { Handler } from "@netlify/functions";
import { prisma } from "@/app/lib/Prisma";
import nodemailer from "nodemailer";

async function sendEmail(to: string, subject: string, html: string) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    await transporter.sendMail({
        from: `"Todo App" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
    });
}

async function sendTaskReminders() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const users = await prisma.user.findMany({
        include: {
            Task: {
                where: { completed: false, duedate: { gte: today, lt: tomorrow } },
            },
        },
    });

    for (const user of users) {
        if (!user.email || user.Task.length === 0) continue;

        const tasksList = user.Task.map(
            (t) =>
                `<tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>${t.title}</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${t.description || "-"}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${t.duedate.toDateString()}</td>
          </tr>`
        ).join("");

        const htmlContent = `
        <div style="font-family: Arial, sans-serif; font-size: 14px; padding: 20px; background-color: #f9f9f9;">
          <h3>Hello ${user.name || "User"},</h3>
          <p>You have the following incomplete tasks for today:</p>
          <table style="width: 100%; border-collapse: collapse; background-color: #fff; box-shadow: 0 0 5px rgba(0,0,0,0.1);">
            <thead>
              <tr style="background-color: #0070f3; color: white;">
                <th style="padding: 10px; text-align: left;">Title</th>
                <th style="padding: 10px; text-align: left;">Description</th>
                <th style="padding: 10px; text-align: left;">Due Date</th>
              </tr>
            </thead>
            <tbody>
              ${tasksList}
            </tbody>
          </table>
          <p style="margin-top: 15px; color: gray; font-size: 12px;">
            This is an automated reminder from Todo App.
          </p>
        </div>
      `;

        await sendEmail(user.email, "Todo App - Tasks Due Today", htmlContent);
    }
}

export const handler: Handler = async () => {
    try {
        await sendTaskReminders();
        return { statusCode: 200, body: "Task reminders sent successfully" };
    } catch (err) {
        console.error(err);
        return { statusCode: 500, body: "Error sending task reminders" };
    }
};
