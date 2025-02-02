// // backend/seed.js
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const { faker } = require('@faker-js/faker');

// // تحميل متغيرات البيئة
// dotenv.config();

// // استيراد النماذج
// const Admin = require('./models/Admin');
// const Category = require('./models/Category');
// const Innovator = require('./models/Innovator');
// const Investor = require('./models/Investor');
// const Innovation = require('./models/Innovation');
// const Commitment = require('./models/Commitment');
// const Investment = require('./models/Investment');
// const Notification = require('./models/Notification');
// const Chatting = require('./models/Chatting');

// // الاتصال بقاعدة البيانات
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB Connected for Seeding'))
//   .catch(err => {
//     console.error('MongoDB Connection Failed:', err.message);
//     process.exit(1);
//   });

// // دالة لإنشاء Admins
// const createAdmins = async (num) => {
//   const admins = [];
//   for (let i = 0; i < num; i++) {
//     admins.push({
//       Admin_ID: faker.string.uuid(),
//       Name: faker.name.fullName(),
//       Email: faker.internet.email(),
//       password: 'password123', // كلمة مرور افتراضية، سيتم تشفيرها في الموديل
//     });
//   }
//   return await Admin.insertMany(admins);
// };

// // دالة لإنشاء Categories
// const createCategories = async (num, adminIds) => {
//   const categories = [];
//   for (let i = 0; i < num; i++) {
//     categories.push({
//       Category_ID: faker.string.uuid(),
//       Name_Category: faker.commerce.department(),
//       Create_by: faker.helpers.arrayElement(adminIds),
//     });
//   }
//   return await Category.insertMany(categories);
// };

// // دالة لإنشاء Innovators
// const createInnovators = async (num, adminIds) => {
//   const innovators = [];
//   for (let i = 0; i < num; i++) {
//     innovators.push({
//       innovator_ID: faker.string.uuid(),
//       first_name: faker.name.firstName(),
//       last_name: faker.name.lastName(),
//       Email: faker.internet.email(),
//       City: faker.address.city(),
//       Education: faker.name.jobTitle(),
//       password: 'password123', // كلمة مرور افتراضية، سيتم تشفيرها في الموديل
//       photo: faker.image.avatar(),
//       phone: faker.phone.number(),
//       birthday: faker.date.past(30, new Date('2002-01-01')),
//       account_x: faker.finance.accountNameName(),
//       // Publish_Date سيتم تعيينه افتراضيًا
//     });
//   }
//   return await Innovator.insertMany(innovators);
// };

// // دالة لإنشاء Investors
// const createInvestors = async (num, adminIds) => {
//   const investors = [];
//   for (let i = 0; i < num; i++) {
//     investors.push({
//       investor_ID: faker.string.uuid(),
//       first_name: faker.name.firstName(),
//       last_name: faker.name.lastName(),
//       Email: faker.internet.email(),
//       Education: faker.name.jobTitle(),
//       password: 'password123', // كلمة مرور افتراضية، سيتم تشفيرها في الموديل
//       photo: faker.image.avatar(),
//       phone: faker.phone.number(),
//       birthday: faker.date.past(30, new Date('2002-01-01')),
//       // Publish_Date سيتم تعيينه افتراضيًا
//     });
//   }
//   return await Investor.insertMany(investors);
// };

// // دالة لإنشاء Innovations
// const createInnovations = async (num, categoryIds, innovatorIds) => {
//   const innovations = [];
//   for (let i = 0; i < num; i++) {
//     innovations.push({
//       ID: faker.string.uuid(),
//       name_innovation: faker.commerce.productName(),
//       description: faker.lorem.paragraph(),
//       cost: parseFloat(faker.commerce.price()),
//       details_innovation: faker.lorem.sentences(),
//       image: faker.image.url(),
//       video: faker.internet.url(),
//       plain: faker.lorem.word(),
//       Create_by: faker.helpers.arrayElement(innovatorIds),
//       // publish_Date سيتم تعيينه افتراضيًا
//     });
//   }
//   return await Innovation.insertMany(innovations);
// };

// // دالة لإنشاء Commitments
// const createCommitments = async (num, investorIds, innovatorIds, investmentIds) => {
//   const commitments = [];
//   for (let i = 0; i < num; i++) {
//     commitments.push({
//       Commitment_ID: faker.string.uuid(),
//       Conditions: faker.lorem.sentence(),
//       investor_ID: faker.helpers.arrayElement(investorIds),
//       innovator_ID: faker.helpers.arrayElement(innovatorIds),
//       investment_ID: faker.helpers.arrayElement(investmentIds),
//       // status، investor_sign، innovator_sign سيتم تعيينها افتراضيًا
//     });
//   }
//   return await Commitment.insertMany(commitments);
// };

// // دالة لإنشاء Investments
// const createInvestments = async (num, innovationIds, commitmentIds) => {
//   const investments = [];
//   for (let i = 0; i < num; i++) {
//     investments.push({
//       Investment_ID: faker.string.uuid(),
//       innovation_ID: faker.helpers.arrayElement(innovationIds),
//       commitment_ID: faker.helpers.arrayElement(commitmentIds),
//       // Publish_Date سيتم تعيينه افتراضيًا
//     });
//   }
//   return await Investment.insertMany(investments);
// };

// // دالة لإنشاء Notifications
// const createNotifications = async (num, adminIds) => {
//   const notifications = [];
//   for (let i = 0; i < num; i++) {
//     notifications.push({
//       notification_ID: faker.string.uuid(),
//       content_noti: faker.lorem.sentence(),
//       Name_notification: faker.lorem.word(),
//       Type: faker.helpers.arrayElement(['info', 'warning', 'error', 'success']),
//       Receive: faker.helpers.arrayElement(adminIds), // يمكن تخصيص المستلم بناءً على نوع الإشعار
//     });
//   }
//   return await Notification.insertMany(notifications);
// };

// // دالة لإنشاء Chatting
// const createChatting = async (num, investorIds, innovatorIds) => {
//   const chattings = [];
//   for (let i = 0; i < num; i++) {
//     // تحديد المرسل والمستقبل عشوائيًا بين المستثمرين والمبتكرين
//     const senderType = faker.helpers.arrayElement(['investor', 'innovator']);
//     const receiverType = senderType === 'investor' ? 'innovator' : 'investor';

//     const senderID = senderType === 'investor' ? faker.helpers.arrayElement(investorIds) : faker.helpers.arrayElement(innovatorIds);
//     const receiverID = receiverType === 'investor' ? faker.helpers.arrayElement(investorIds) : faker.helpers.arrayElement(innovatorIds);

//     chattings.push({
//       ID: faker.string.uuid(),
//       Sender_ID: senderID,
//       Receiver_ID: receiverID,
//       senderModel: senderType.charAt(0).toUpperCase() + senderType.slice(1), // 'Investor' أو 'Innovator'
//       receiverModel: receiverType.charAt(0).toUpperCase() + receiverType.slice(1), // 'Investor' أو 'Innovator'
//       Message: faker.lorem.sentence(),
//       // status، Publish_date سيتم تعيينها افتراضيًا
//     });
//   }
//   return await Chatting.insertMany(chattings);
// };

// // دالة لإزالة البيانات القديمة وإدخال بيانات جديدة
// const seedData = async () => {
//   try {
//     // إزالة البيانات القديمة
//     await Admin.deleteMany({});
//     await Category.deleteMany({});
//     await Innovator.deleteMany({});
//     await Investor.deleteMany({});
//     await Innovation.deleteMany({});
//     await Commitment.deleteMany({});
//     await Investment.deleteMany({});
//     await Notification.deleteMany({});
//     await Chatting.deleteMany({});

//     console.log('Old Data Cleared');

//     // إنشاء Admins
//     const admins = await createAdmins(5);
//     const adminIds = admins.map(admin => admin._id);
//     console.log('Admins Created');

//     // إنشاء Categories
//     const categories = await createCategories(10, adminIds);
//     const categoryIds = categories.map(category => category._id);
//     console.log('Categories Created');

//     // إنشاء Innovators
//     const innovators = await createInnovators(20, adminIds);
//     const innovatorIds = innovators.map(innovator => innovator._id);
//     console.log('Innovators Created');

//     // إنشاء Investors
//     const investors = await createInvestors(20, adminIds);
//     const investorIds = investors.map(investor => investor._id);
//     console.log('Investors Created');

//     // إنشاء Innovations
//     const innovations = await createInnovations(30, categoryIds, innovatorIds);
//     const innovationIds = innovations.map(innovation => innovation._id);
//     console.log('Innovations Created');

//     // إنشاء Investments (يجب أن يتم بعد إنشاء Innovations)
//     const investments = await createInvestments(25, innovationIds, []);
//     const investmentIds = investments.map(investment => investment._id);
//     console.log('Investments Created');

//     // إنشاء Commitments (يجب أن يتم بعد إنشاء Investors, Innovators, Investments)
//     const commitments = await createCommitments(25, investorIds, innovatorIds, investmentIds);
//     const commitmentIds = commitments.map(commitment => commitment._id);
//     console.log('Commitments Created');

//     // تحديث Investments مع commitment_ID
//     for (let i = 0; i < investments.length; i++) {
//       investments[i].commitment_ID = commitmentIds[i];
//       await investments[i].save();
//     }
//     console.log('Investments Updated with Commitment IDs');

//     // إنشاء Notifications
//     const notifications = await createNotifications(15, adminIds);
//     console.log('Notifications Created');

//     // إنشاء Chatting
//     const chattings = await createChatting(50, investorIds, innovatorIds);
//     console.log('Chatting Messages Created');

//     console.log('Seeding Completed Successfully');
//     process.exit();
//   } catch (error) {
//     console.error('Seeding Failed:', error);
//     process.exit(1);
//   }
// };

// // تشغيل دالة seeding
// seedData();
// backend/seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");

// تحميل متغيرات البيئة
dotenv.config();

// استيراد النماذج
const Admin = require("./models/Admin");
const Category = require("./models/Category");
const Innovator = require("./models/Innovator");
const Investor = require("./models/Investor");
const Innovation = require("./models/Innovation");
const Commitment = require("./models/Commitment");
const Investment = require("./models/Investment");
const Notification = require("./models/Notification");
const Chatting = require("./models/Chatting");

// الاتصال بقاعدة البيانات
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected for Seeding"))
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err.message);
    process.exit(1);
  });

// دالة لإنشاء Admins
const createAdmins = async (num) => {
  const admins = [];
  for (let i = 0; i < num; i++) {
    admins.push({
      Admin_ID: faker.string.uuid(),
      Name: faker.name.fullName(),
      Email: faker.internet.email(),
      password: "password123", // كلمة مرور افتراضية، سيتم تشفيرها في الموديل
    });
  }
  admins.push({
    Admin_ID: faker.string.uuid(),
    Name: 'saherqaid',
    Email: 'saher@gmail.com',
    password: "password", // كلمة مرور افتراضية، سيتم تشفيرها في الموديل
  });
  return await Admin.insertMany(admins);
};

// دالة لإنشاء Categories
const createCategories = async (num, adminIds) => {
  const categories = [];
  for (let i = 0; i < num; i++) {
    categories.push({
      Category_ID: faker.string.uuid(),
      Name_Category: faker.commerce.department(),
      Create_by: faker.helpers.arrayElement(adminIds),
    });
  }
  return await Category.insertMany(categories);
};

// دالة لإنشاء Innovators
const createInnovators = async (num, adminIds) => {
  const innovators = [];
  for (let i = 0; i < num; i++) {
    innovators.push({
      innovator_ID: faker.string.uuid(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      Email: faker.internet.email(),
      City: faker.address.city(),
      Education: faker.name.jobTitle(),
      password: "password123", // كلمة مرور افتراضية، سيتم تشفيرها في الموديل
      photo: faker.image.avatar(),
      phone: faker.phone.number(),
      birthday: faker.date.past(30, new Date("2002-01-01")),
      account_x: faker.finance.accountName(),
      // Publish_Date سيتم تعيينه افتراضيًا
    });
  }
  return await Innovator.insertMany(innovators);
};

// دالة لإنشاء Investors
const createInvestors = async (num, adminIds) => {
  const investors = [];
  for (let i = 0; i < num; i++) {
    investors.push({
      investor_ID: faker.string.uuid(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      Email: faker.internet.email(),
      Education: faker.name.jobTitle(),
      password: "password123", // كلمة مرور افتراضية، سيتم تشفيرها في الموديل
      photo: faker.image.avatar(),
      phone: faker.phone.number(),
      birthday: faker.date.past(30, new Date("2002-01-01")),
      // Publish_Date سيتم تعيينه افتراضيًا
    });
  }
  return await Investor.insertMany(investors);
};

// دالة لإنشاء Innovations
const createInnovations = async (num, categoryIds, innovatorIds) => {
  const innovations = [];
  for (let i = 0; i < num; i++) {
    innovations.push({
      ID: faker.string.uuid(),
      name_innovation: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      cost: parseFloat(faker.commerce.price()),
      details_innovation: faker.lorem.sentences(),
      image: faker.image.url(),
      video: faker.internet.url(),
      plain: faker.lorem.word(),
      Create_by: faker.helpers.arrayElement(innovatorIds),
      // publish_Date سيتم تعيينه افتراضيًا
    });
  }
  return await Innovation.insertMany(innovations);
};

// دالة لإنشاء Investments بدون commitment_ID
const createInvestments = async (num, innovationIds) => {
  const investments = [];
  for (let i = 0; i < num; i++) {
    investments.push({
      Investment_ID: faker.string.uuid(),
      innovation_ID: faker.helpers.arrayElement(innovationIds),
      // commitment_ID سيتم تعيينه لاحقًا
      // Publish_Date سيتم تعيينه افتراضيًا
    });
  }
  return await Investment.insertMany(investments);
};

// دالة لإنشاء Commitments
const createCommitments = async (
  num,
  investorIds,
  innovatorIds,
  investmentIds
) => {
  const commitments = [];
  for (let i = 0; i < num; i++) {
    commitments.push({
      Commitment_ID: faker.string.uuid(),
      Conditions: faker.lorem.sentence(),
      investor_ID: faker.helpers.arrayElement(investorIds),
      innovator_ID: faker.helpers.arrayElement(innovatorIds),
      investment_ID: faker.helpers.arrayElement(investmentIds),
      // status، investor_sign، innovator_sign سيتم تعيينها افتراضيًا
    });
  }
  return await Commitment.insertMany(commitments);
};

// دالة لإنشاء Notifications
const createNotifications = async (num, adminIds) => {
  const notifications = [];
  for (let i = 0; i < num; i++) {
    notifications.push({
      notification_ID: faker.string.uuid(),
      content_noti: faker.lorem.sentence(),
      Name_notification: faker.lorem.word(),
      Type: faker.helpers.arrayElement(["info", "warning", "error", "success"]),
      Receive: faker.helpers.arrayElement(adminIds), // يمكن تخصيص المستلم بناءً على نوع الإشعار
    });
  }
  return await Notification.insertMany(notifications);
};

// دالة لإنشاء Chatting
const createChatting = async (num, investorIds, innovatorIds) => {
  const chattings = [];
  for (let i = 0; i < num; i++) {
    // تحديد المرسل والمستقبل عشوائيًا بين المستثمرين والمبتكرين
    const senderType = faker.helpers.arrayElement(["investor", "innovator"]);
    const receiverType = senderType === "investor" ? "innovator" : "investor";

    const senderID =
      senderType === "investor"
        ? faker.helpers.arrayElement(investorIds)
        : faker.helpers.arrayElement(innovatorIds);
    const receiverID =
      receiverType === "investor"
        ? faker.helpers.arrayElement(investorIds)
        : faker.helpers.arrayElement(innovatorIds);

    chattings.push({
      ID: faker.string.uuid(),
      Sender_ID: senderID,
      Receiver_ID: receiverID,
      senderModel: senderType.charAt(0).toUpperCase() + senderType.slice(1), // 'Investor' أو 'Innovator'
      receiverModel:
        receiverType.charAt(0).toUpperCase() + receiverType.slice(1), // 'Investor' أو 'Innovator'
      Message: faker.lorem.sentence(),
      // status، Publish_date سيتم تعيينها افتراضيًا
    });
  }
  return await Chatting.insertMany(chattings);
};

// دالة لإزالة البيانات القديمة وإدخال بيانات جديدة
const seedData = async () => {
  try {
    // إزالة البيانات القديمة
    await Admin.deleteMany({});
    await Category.deleteMany({});
    await Innovator.deleteMany({});
    await Investor.deleteMany({});
    await Innovation.deleteMany({});
    await Commitment.deleteMany({});
    await Investment.deleteMany({});
    await Notification.deleteMany({});
    await Chatting.deleteMany({});

    console.log("Old Data Cleared");

    // إنشاء Admins
    const admins = await createAdmins(5);
    const adminIds = admins.map((admin) => admin._id);
    console.log("Admins Created");

    // إنشاء Categories
    const categories = await createCategories(10, adminIds);
    const categoryIds = categories.map((category) => category._id);
    console.log("Categories Created");

    // إنشاء Innovators
    const innovators = await createInnovators(20, adminIds);
    const innovatorIds = innovators.map((innovator) => innovator._id);
    console.log("Innovators Created");

    // إنشاء Investors
    const investors = await createInvestors(20, adminIds);
    const investorIds = investors.map((investor) => investor._id);
    console.log("Investors Created");

    // إنشاء Innovations
    const innovations = await createInnovations(30, categoryIds, innovatorIds);
    const innovationIds = innovations.map((innovation) => innovation._id);
    console.log("Innovations Created");

    // إنشاء Investments بدون commitment_ID
    const investments = await createInvestments(25, innovationIds);
    const investmentIds = investments.map((investment) => investment._id);
    console.log("Investments Created");

    // إنشاء Commitments
    const commitments = await createCommitments(
      25,
      investorIds,
      innovatorIds,
      investmentIds
    );
    const commitmentIds = commitments.map((commitment) => commitment._id);
    console.log("Commitments Created");

    // تحديث Investments مع commitment_ID
    for (let i = 0; i < investments.length; i++) {
      // Assuming one commitment per investment
      const commitmentId = commitmentIds[i] || null;
      if (commitmentId) {
        await Investment.findByIdAndUpdate(investments[i]._id, {
          commitment_ID: commitmentId,
        });
      }
    }
    console.log("Investments Updated with Commitment IDs");

    // إنشاء Notifications
    const notifications = await createNotifications(15, adminIds);
    console.log("Notifications Created");

    // إنشاء Chatting
    const chattings = await createChatting(50, investorIds, innovatorIds);
    console.log("Chatting Messages Created");

    console.log("Seeding Completed Successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding Failed:", error);
    process.exit(1);
  }
};

// تشغيل دالة seeding
seedData();
