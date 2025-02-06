// import express from 'express';
import xlsx from 'xlsx';
import { PrismaClient } from '@prisma/client';
import { generateRefNum } from './utils/utils.js';
const prisma = new PrismaClient();



const excelFilePath = 'C:/Users/EVERMATE/Downloads/api_users_customuser.csv';

function readExcelFile(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet); 
}

// Function to seed the database
async function seedDatabase() {
  try {
    const data = readExcelFile(excelFilePath);

    for (const row of data) {
        // const lastIncidentType = await prisma.site.findFirst({
        //     orderBy: { createdAt: 'desc' },
        //     // select: { numRef: true }
        // });
      // Map Excel columns to your Prisma model fields
    //   const date = new Date();
    //     const mm = String(date.getMonth() + 1).padStart(2, '0');
    //     const yy = String(date.getFullYear()).slice(-2);
    //     const prefix = `${mm}${yy}`;
    //     const nextNum = lastIncidentType ? parseInt(lastIncidentType.numRef.slice(-4)) + 1 : 1;
    //     const numRef = generateRefNum(lastIncidentType)

      const incidentType = {
        name: `${row['first_name']} ${row['last_name']}`,
        email: row['email'],
        userId: row['id'],
        // numRef,
        createdBy:"user 1",
        entityId:"235bb09e-72c2-48da-bcf8-252a0df80876"
      };

      console.log(incidentType);

      // Insert data into the database
      await prisma.employee
    //   .create({
    //     data: incidentType,
    //   });
      .upsert({
        where: {
          name: incidentType.name,
        },
        update: {
          name: incidentType.name,
        },
        create: {...incidentType},
    })
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();