const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const fs = require("fs");

class MailManager {
  preparePDF(order, user) {
    this.createDocument(order, user);
  }

  sendMail = async (recepient, subject, messageBody, attachmentName) => {
    try {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "chanuka.nibm@gmail.com",
          clientId:
            "605393212525-ibq036hleemn84ahn5refs49ka0jpbbl.apps.googleusercontent.com",
          clientSecret: "YcMHrJ43DNkvqZtQRAq5OmdF",
          refreshToken:
            "1//04536Dm_K8v6DCgYIARAAGAQSNwF-L9Ird7C8BxRtHsXPFcbQcGmEDXI79BEgVUq0wkeNWZoyjpmGeV4F6OVlwgWfnNXHiz5EAP8",
        },
      });

      var mailOptions = {
        from: "chanuka.nibm@gmail.com",
        to: recepient,
        subject: subject,
        text: messageBody,
        attachments: [
          {
            filename: `${attachmentName}.pdf`,
            path: `./${attachmentName}.pdf`,
            contentType: "application/pdf",
          },
        ],
      };

      let info = await transporter.sendMail(mailOptions);
      if (info.accepted.includes(recepient.toLowerCase())) {
        fs.unlinkSync(`./${attachmentName}.pdf`, (err) => {
          if (err) throw err;
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  generateCustomerInformation(doc, order, user) {
    let data = new Date();
    doc
      .strokeColor("#000000")
      .lineWidth(1)
      .moveTo(50, 115)
      .lineTo(550, 115)
      .stroke();
    doc.fontSize(10);
    doc
      .text(`Customer Name: ${user.name}`, 50, 125)
      .text(`Order No: ${order._id}`, 50, 150)
      .text(
        `Order Date: ${data.getFullYear()}-${data.getMonth()}-${data.getDate()}`,
        50,
        175
      )
      .text(
        `Shipping Address: ${user.address.address1}  ${user.address.address2},`,
        300,
        125
      )
      .text(`${user.address.city} ${user.address.state},`, 385, 140)
      .text(`${user.address.country},`, 385, 155)
      .text(`${user.address.postalCode}`, 385, 170);
    doc
      .strokeColor("#000000")
      .lineWidth(1)
      .moveTo(50, 190)
      .lineTo(550, 190)
      .stroke();
  }

  generateTable(doc, order) {
    let i,
      top = 250,
      bottom = 0;
    let items = order.items;
    const position = top;
    doc
      .fontSize(12)
      .text("Name", 50, position)
      .text("Unit Price (USD)", 280, position, { width: 90, align: "right" })
      .text("Quantity", 340, position, { width: 90, align: "right" })
      .text("Line Total (USD)", 0, position, { align: "right" });

    doc
      .strokeColor("#000000")
      .lineWidth(2)
      .moveTo(50, position + 20)
      .lineTo(550, position + 20)
      .stroke();

    for (i = 0; i < items.length; i++) {
      const item = items[i];
      const position = top + (i + 1) * 30;
      this.generateTableRow(
        doc,
        position,
        item.itemName,
        item.itemCount,
        item.itemprice
      );
      this.generateLineBreak(doc, position + 20);
      bottom = position + 40;
    }
    doc.text(`Total Amount(USD): ${order.total}`, 0, bottom, {
      align: "right",
    });
  }

  generateTableRow(doc, y, name, qty, unitPrice) {
    doc
      .fontSize(10)
      .text(name, 50, y)
      .text(unitPrice, 280, y, { width: 90, align: "right" })
      .text(qty, 340, y, { width: 90, align: "right" })
      .text(unitPrice * qty, 0, y, { align: "right" });
  }

  generateLineBreak(doc, y) {
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(0.5)
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke();
  }

  createDocument(order, user) {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(`./${order._id}.pdf`));

    doc.fontSize(20);
    doc.text("Order Details", 250, 50);

    this.generateCustomerInformation(doc, order, user);
    this.generateTable(doc, order);

    doc.end();

    this.sendMail(
      user.email,
      "Order Details",
      "Please find the attached order details PDF file.",
      order._id
    );
  }
}

module.exports = MailManager;
