import { IHomeBannerData, IHomeSectionOneData, IHomeSectionTwoData } from 'app/shared/model/home-data.model';
import React from 'react';

export const bannerData: IHomeBannerData = {
  title: 'Welcome to Archipad',
  paragraphOne: 'Your all-in-one solution for efficient and seamless architecture project management.',
  paragraphTwo:
    'Unleash the full potential of your projects with our intuitive and feature-rich platform designed specifically for architects and project teams.',
};

export const sectionOneData: IHomeSectionOneData[] = [
  {
    title: 'Simplicity and Power',
    content:
      'Enjoy a user-friendly interface without compromising on powerful project management capabilities. ArchiManage is designed to be both simple for beginners and robust for seasoned professionals.',
    src: '../../../content/images/simplicity-and-power.png',
  },
  {
    title: 'Security First',
    content:
      'Your project data is your priority. Benefit from bank-level security protocols, ensuring that your sensitive information is always safe and secure.',
    src: '../../../content/images/security-first.png',
  },
  {
    title: 'Scalability',
    content:
      "Whether you're managing a small-scale project or a large architectural endeavor, Archipad scales with you. Grow your projects without limits.",
    src: '../../../content/images/scalability.png',
  },
];

export const HomeSectionTwoData: IHomeSectionTwoData[] = [
  {
    title: 'Project Overview',
    content: [
      <p key="1">Gain a comprehensive view of your architecture projects at a glance.</p>,
      <p key="2">Track progress, milestones, and deadlines in real-time, ensuring your team stays on track.</p>,
    ],
    svg: (
      <svg width="32px" height="32px" viewBox="0 0 32 32">
        <defs>
          <linearGradient x1="50%" y1="0%" x2="50%" y2="98.8500478%" id="linearGradient-1">
            <stop stopColor="#FFD24C" offset="0%" />
            <stop stopColor="#FFB800" offset="100%" />
          </linearGradient>
        </defs>
        <path
          d="M11.2,19.9763991 L1.43301577,25.9589289
             C0.542750835,26.5042392 1.20441457e-15,27.4731633 1.33226763e-15,28.5171628
                L0,28.5171628 L0,30 C1.3527075e-16,31.1045695 0.8954305,32 2,32
                L30,32 C31.1045695,32 32,31.1045695 32,30 L32,30 L32,28.5391533
                C32,27.4832633 31.4449138,26.5051178 30.53843,25.9636469 L30.53843,25.9636469
                L20.8,20.1465799 L20.8,18.1051172 C22.2729985,16.7867478 23.2,14.8708611 23.2,12.7384615
                L23.2,7.2 C23.2,3.2235498 19.9764502,-7.30462051e-16 16,0
                C12.0235498,7.30462051e-16 8.8,3.2235498 8.8,7.2 L8.8,7.2
                L8.8,12.7384615 C8.8,14.8708611 9.72700154,16.7867478 11.2,18.1051172 L11.2,19.9763991 Z"
          fill="#D9D9D9"
        />
        <path
          d="M11.2,19.9763991 L1.43301577,25.9589289
          C0.542750835,26.5042392 1.20441457e-15,27.4731633 1.33226763e-15,28.5171628
                L0,28.5171628 L0,30 C1.3527075e-16,31.1045695 0.8954305,32 2,32
                L30,32 C31.1045695,32 32,31.1045695 32,30 L32,30 L32,28.5391533
                C32,27.4832633 31.4449138,26.5051178 30.53843,25.9636469 L30.53843,25.9636469
                L20.8,20.1465799 L20.8,18.1051172 C22.2729985,16.7867478 23.2,14.8708611 23.2,12.7384615
                L23.2,7.2 C23.2,3.2235498 19.9764502,-7.30462051e-16 16,0
                C12.0235498,7.30462051e-16 8.8,3.2235498 8.8,7.2 L8.8,7.2
                L8.8,12.7384615 C8.8,14.8708611 9.72700154,16.7867478 11.2,18.1051172 L11.2,19.9763991 Z"
          fill="url(#linearGradient-1)"
          className="icon-hover"
        />
      </svg>
    ),
  },
  {
    title: 'Collaborative Workspaces',
    content: [
      <p key="1">Foster teamwork with dedicated workspaces for each project.</p>,
      <p key="2">Share files, updates, and ideas effortlessly, promoting collaboration and enhancing communication.</p>,
    ],
    svg: (
      <svg width="32px" height="32px" viewBox="0 0 32 32">
        <path
          d="M22.3555358,32 L9.93657149,32 L2,32 C0.8954305,32 1.3527075e-16,31.1045695 0,30
            L0,18 C-1.3527075e-16,16.8954305 0.8954305,16 2,16 L2,16 L6.78535432,16 L6.78535432,2
          L6.78535432,2 C6.78535432,0.8954305 7.68078482,2.02906125e-16 8.78535432,0 L21.7853543,0
          C22.8899238,-2.02906125e-16 23.7853543,0.8954305 23.7853543,2 L23.7853543,7 L30,7
          C31.1045695,7 32,7.8954305 32,9 L32,30 C32,31.1045695 31.1045695,32 30,32 L22.3555358,32
          Z M10,4 L10,8 L14,8 L14,4 L10,4 Z M10,12 L10,16 L14,16 L14,12 L10,12 Z M10,20 L10,24 L14,24
          L14,20 L10,20 Z M3,20 L3,24 L7,24 L7,20 L3,20 Z M17,4 L17,8 L21,8 L21,4 L17,4 Z M17,12 L17,16
          L21,16 L21,12 L17,12 Z M17,20 L17,24 L21,24 L21,20 L17,20 Z M24,20 L24,24 L28,24 L28,20 L24,20
          Z M24,12 L24,16 L28,16 L28,12 L24,12 Z"
          fill="#D9D9D9"
        />
        <path
          d="M22.3555358,32 L9.93657149,32 L2,32 C0.8954305,32 1.3527075e-16,31.1045695 0,30
            L0,18 C-1.3527075e-16,16.8954305 0.8954305,16 2,16 L2,16 L6.78535432,16 L6.78535432,2
          L6.78535432,2 C6.78535432,0.8954305 7.68078482,2.02906125e-16 8.78535432,0 L21.7853543,0
          C22.8899238,-2.02906125e-16 23.7853543,0.8954305 23.7853543,2 L23.7853543,7 L30,7
          C31.1045695,7 32,7.8954305 32,9 L32,30 C32,31.1045695 31.1045695,32 30,32 L22.3555358,32
          Z M10,4 L10,8 L14,8 L14,4 L10,4 Z M10,12 L10,16 L14,16 L14,12 L10,12 Z M10,20 L10,24 L14,24
          L14,20 L10,20 Z M3,20 L3,24 L7,24 L7,20 L3,20 Z M17,4 L17,8 L21,8 L21,4 L17,4 Z M17,12 L17,16
          L21,16 L21,12 L17,12 Z M17,20 L17,24 L21,24 L21,20 L17,20 Z M24,20 L24,24 L28,24 L28,20 L24,20
          Z M24,12 L24,16 L28,16 L28,12 L24,12 Z"
          fill="url(#linearGradient-1)"
          className="icon-hover"
        />
      </svg>
    ),
  },
  {
    title: 'Document Management',
    content: [
      <p key="1">Organize and manage all project-related documents in one secure location.</p>,
      <p key="2">Easily upload, version control, and share blueprints, CAD files, and other essential documents.</p>,
    ],
    svg: (
      <svg width="32px" height="32px" viewBox="0 0 32 32">
        <path
          d="M22.3555358,32 L9.93657149,32 L2,32 C0.8954305,32 1.3527075e-16,31.1045695 0,30
            L0,18 C-1.3527075e-16,16.8954305 0.8954305,16 2,16 L2,16 L6.78535432,16 L6.78535432,2
          L6.78535432,2 C6.78535432,0.8954305 7.68078482,2.02906125e-16 8.78535432,0 L21.7853543,0
          C22.8899238,-2.02906125e-16 23.7853543,0.8954305 23.7853543,2 L23.7853543,7 L30,7
          C31.1045695,7 32,7.8954305 32,9 L32,30 C32,31.1045695 31.1045695,32 30,32 L22.3555358,32
          Z M10,4 L10,8 L14,8 L14,4 L10,4 Z M10,12 L10,16 L14,16 L14,12 L10,12 Z M10,20 L10,24 L14,24
          L14,20 L10,20 Z M3,20 L3,24 L7,24 L7,20 L3,20 Z M17,4 L17,8 L21,8 L21,4 L17,4 Z M17,12 L17,16
          L21,16 L21,12 L17,12 Z M17,20 L17,24 L21,24 L21,20 L17,20 Z M24,20 L24,24 L28,24 L28,20 L24,20
          Z M24,12 L24,16 L28,16 L28,12 L24,12 Z"
          fill="#D9D9D9"
        />
        <path
          d="M22.3555358,32 L9.93657149,32 L2,32 C0.8954305,32 1.3527075e-16,31.1045695 0,30
            L0,18 C-1.3527075e-16,16.8954305 0.8954305,16 2,16 L2,16 L6.78535432,16 L6.78535432,2
          L6.78535432,2 C6.78535432,0.8954305 7.68078482,2.02906125e-16 8.78535432,0 L21.7853543,0
          C22.8899238,-2.02906125e-16 23.7853543,0.8954305 23.7853543,2 L23.7853543,7 L30,7
          C31.1045695,7 32,7.8954305 32,9 L32,30 C32,31.1045695 31.1045695,32 30,32 L22.3555358,32
          Z M10,4 L10,8 L14,8 L14,4 L10,4 Z M10,12 L10,16 L14,16 L14,12 L10,12 Z M10,20 L10,24 L14,24
          L14,20 L10,20 Z M3,20 L3,24 L7,24 L7,20 L3,20 Z M17,4 L17,8 L21,8 L21,4 L17,4 Z M17,12 L17,16
          L21,16 L21,12 L17,12 Z M17,20 L17,24 L21,24 L21,20 L17,20 Z M24,20 L24,24 L28,24 L28,20 L24,20
          Z M24,12 L24,16 L28,16 L28,12 L24,12 Z"
          fill="url(#linearGradient-1)"
          className="icon-hover"
        />
      </svg>
    ),
  },
  {
    title: 'Task and Deadline Tracking',
    content: [
      <p key="1">Keep your team on schedule with our robust task management system.</p>,
      <p key="2">Assign tasks, set deadlines, and monitor progress to ensure timely project delivery.</p>,
    ],
    svg: (
      <svg width="32px" height="32px" viewBox="0 0 32 32">
        <path
          d="M22.3555358,32 L9.93657149,32 L2,32 C0.8954305,32 1.3527075e-16,31.1045695 0,30
            L0,18 C-1.3527075e-16,16.8954305 0.8954305,16 2,16 L2,16 L6.78535432,16 L6.78535432,2
          L6.78535432,2 C6.78535432,0.8954305 7.68078482,2.02906125e-16 8.78535432,0 L21.7853543,0
          C22.8899238,-2.02906125e-16 23.7853543,0.8954305 23.7853543,2 L23.7853543,7 L30,7
          C31.1045695,7 32,7.8954305 32,9 L32,30 C32,31.1045695 31.1045695,32 30,32 L22.3555358,32
          Z M10,4 L10,8 L14,8 L14,4 L10,4 Z M10,12 L10,16 L14,16 L14,12 L10,12 Z M10,20 L10,24 L14,24
          L14,20 L10,20 Z M3,20 L3,24 L7,24 L7,20 L3,20 Z M17,4 L17,8 L21,8 L21,4 L17,4 Z M17,12 L17,16
          L21,16 L21,12 L17,12 Z M17,20 L17,24 L21,24 L21,20 L17,20 Z M24,20 L24,24 L28,24 L28,20 L24,20
          Z M24,12 L24,16 L28,16 L28,12 L24,12 Z"
          fill="#D9D9D9"
        />
        <path
          d="M22.3555358,32 L9.93657149,32 L2,32 C0.8954305,32 1.3527075e-16,31.1045695 0,30
            L0,18 C-1.3527075e-16,16.8954305 0.8954305,16 2,16 L2,16 L6.78535432,16 L6.78535432,2
          L6.78535432,2 C6.78535432,0.8954305 7.68078482,2.02906125e-16 8.78535432,0 L21.7853543,0
          C22.8899238,-2.02906125e-16 23.7853543,0.8954305 23.7853543,2 L23.7853543,7 L30,7
          C31.1045695,7 32,7.8954305 32,9 L32,30 C32,31.1045695 31.1045695,32 30,32 L22.3555358,32
          Z M10,4 L10,8 L14,8 L14,4 L10,4 Z M10,12 L10,16 L14,16 L14,12 L10,12 Z M10,20 L10,24 L14,24
          L14,20 L10,20 Z M3,20 L3,24 L7,24 L7,20 L3,20 Z M17,4 L17,8 L21,8 L21,4 L17,4 Z M17,12 L17,16
          L21,16 L21,12 L17,12 Z M17,20 L17,24 L21,24 L21,20 L17,20 Z M24,20 L24,24 L28,24 L28,20 L24,20
          Z M24,12 L24,16 L28,16 L28,12 L24,12 Z"
          fill="url(#linearGradient-1)"
          className="icon-hover"
        />
      </svg>
    ),
  },
  {
    title: 'Mobile Accessibility',
    content: [
      <p key="1">Stay connected on the go.</p>,
      <p key="2">
        {"Access ArchiManage from your desktop or mobile device, ensuring that you're always in the loop, no matter where you are."}
      </p>,
    ],
    svg: (
      <svg width="32px" height="32px" viewBox="0 0 32 32">
        <path
          d="M22.3555358,32 L9.93657149,32 L2,32 C0.8954305,32 1.3527075e-16,31.1045695 0,30
            L0,18 C-1.3527075e-16,16.8954305 0.8954305,16 2,16 L2,16 L6.78535432,16 L6.78535432,2
          L6.78535432,2 C6.78535432,0.8954305 7.68078482,2.02906125e-16 8.78535432,0 L21.7853543,0
          C22.8899238,-2.02906125e-16 23.7853543,0.8954305 23.7853543,2 L23.7853543,7 L30,7
          C31.1045695,7 32,7.8954305 32,9 L32,30 C32,31.1045695 31.1045695,32 30,32 L22.3555358,32
          Z M10,4 L10,8 L14,8 L14,4 L10,4 Z M10,12 L10,16 L14,16 L14,12 L10,12 Z M10,20 L10,24 L14,24
          L14,20 L10,20 Z M3,20 L3,24 L7,24 L7,20 L3,20 Z M17,4 L17,8 L21,8 L21,4 L17,4 Z M17,12 L17,16
          L21,16 L21,12 L17,12 Z M17,20 L17,24 L21,24 L21,20 L17,20 Z M24,20 L24,24 L28,24 L28,20 L24,20
          Z M24,12 L24,16 L28,16 L28,12 L24,12 Z"
          fill="#D9D9D9"
        />
        <path
          d="M22.3555358,32 L9.93657149,32 L2,32 C0.8954305,32 1.3527075e-16,31.1045695 0,30
            L0,18 C-1.3527075e-16,16.8954305 0.8954305,16 2,16 L2,16 L6.78535432,16 L6.78535432,2
          L6.78535432,2 C6.78535432,0.8954305 7.68078482,2.02906125e-16 8.78535432,0 L21.7853543,0
          C22.8899238,-2.02906125e-16 23.7853543,0.8954305 23.7853543,2 L23.7853543,7 L30,7
          C31.1045695,7 32,7.8954305 32,9 L32,30 C32,31.1045695 31.1045695,32 30,32 L22.3555358,32
          Z M10,4 L10,8 L14,8 L14,4 L10,4 Z M10,12 L10,16 L14,16 L14,12 L10,12 Z M10,20 L10,24 L14,24
          L14,20 L10,20 Z M3,20 L3,24 L7,24 L7,20 L3,20 Z M17,4 L17,8 L21,8 L21,4 L17,4 Z M17,12 L17,16
          L21,16 L21,12 L17,12 Z M17,20 L17,24 L21,24 L21,20 L17,20 Z M24,20 L24,24 L28,24 L28,20 L24,20
          Z M24,12 L24,16 L28,16 L28,12 L24,12 Z"
          fill="url(#linearGradient-1)"
          className="icon-hover"
        />
      </svg>
    ),
  },
  {
    title: 'Communication Hub',
    content: [
      <p key="1">Centralize project communication with in-app messaging and discussion forums.</p>,
      <p key="2">Say goodbye to scattered emails and missed messages.</p>,
    ],
    svg: (
      <svg width="32px" height="32px" viewBox="0 0 32 32">
        <defs>
          <linearGradient x1="50%" y1="0%" x2="50%" y2="98.8500478%" id="linearGradient-1">
            <stop stopColor="#FFD24C" offset="0%" />
            <stop stopColor="#FFB800" offset="100%" />
          </linearGradient>
        </defs>
        <path
          d="M11.2,19.9763991 L1.43301577,25.9589289
             C0.542750835,26.5042392 1.20441457e-15,27.4731633 1.33226763e-15,28.5171628
                L0,28.5171628 L0,30 C1.3527075e-16,31.1045695 0.8954305,32 2,32
                L30,32 C31.1045695,32 32,31.1045695 32,30 L32,30 L32,28.5391533
                C32,27.4832633 31.4449138,26.5051178 30.53843,25.9636469 L30.53843,25.9636469
                L20.8,20.1465799 L20.8,18.1051172 C22.2729985,16.7867478 23.2,14.8708611 23.2,12.7384615
                L23.2,7.2 C23.2,3.2235498 19.9764502,-7.30462051e-16 16,0
                C12.0235498,7.30462051e-16 8.8,3.2235498 8.8,7.2 L8.8,7.2
                L8.8,12.7384615 C8.8,14.8708611 9.72700154,16.7867478 11.2,18.1051172 L11.2,19.9763991 Z"
          fill="#D9D9D9"
        />
        <path
          d="M11.2,19.9763991 L1.43301577,25.9589289
          C0.542750835,26.5042392 1.20441457e-15,27.4731633 1.33226763e-15,28.5171628
                L0,28.5171628 L0,30 C1.3527075e-16,31.1045695 0.8954305,32 2,32
                L30,32 C31.1045695,32 32,31.1045695 32,30 L32,30 L32,28.5391533
                C32,27.4832633 31.4449138,26.5051178 30.53843,25.9636469 L30.53843,25.9636469
                L20.8,20.1465799 L20.8,18.1051172 C22.2729985,16.7867478 23.2,14.8708611 23.2,12.7384615
                L23.2,7.2 C23.2,3.2235498 19.9764502,-7.30462051e-16 16,0
                C12.0235498,7.30462051e-16 8.8,3.2235498 8.8,7.2 L8.8,7.2
                L8.8,12.7384615 C8.8,14.8708611 9.72700154,16.7867478 11.2,18.1051172 L11.2,19.9763991 Z"
          fill="url(#linearGradient-1)"
          className="icon-hover"
        />
      </svg>
    ),
  },
];
