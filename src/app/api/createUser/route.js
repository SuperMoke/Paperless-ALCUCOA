import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY
    }),
  });
}

const formatTime = (hours, minutes) => {
    const ampm = hours >= 12 ? "PM" : "AM";
    let formattedHours = hours % 12;
    formattedHours = formattedHours ? formattedHours : 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

export async function POST(request) {
  try {
    const { email, password, role, name, institute,idnumber,position,status } = await request.json();
    const auth = getAuth();
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    
    
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    const db = getFirestore();
    await db.collection('userdata').doc(userRecord.uid).set({
        name,
        email,
        institute,
        idnumber,
        position,
        status,
        role,
    });

    return NextResponse.json({ message: 'User created successfully', uid: userRecord.uid }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

