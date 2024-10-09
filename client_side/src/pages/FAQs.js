import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa'; // Importing an icon for the FAQ section

const faqsData = [
  {
    question: 'What is the purpose of this platform?',
    answer: 'This platform is designed to provide resources and support for students in their academic journey, including access to course materials and deadlines.',
  },
  {
    question: 'How can I contact support?',
    answer: 'You can contact support via the "Contact Us" section on the website or send an email to support@example.com.',
  },
  {
    question: 'What resources are available to students?',
    answer: 'We offer a variety of resources including study materials, assignment submissions, and event announcements.',
  },
  {
    question: 'How do I reset my password?',
    answer: 'To reset your password, click on "Forgot Password" on the login page and follow the instructions sent to your email.',
  },
  {
    question: 'Are there any upcoming events?',
    answer: 'Yes, please check the "Events" section for the latest updates on upcoming events and deadlines.',
  },
];

function FAQs() {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center text-white">
        <FaQuestionCircle className="mr-2" />
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqsData.map((faq, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold text-lg text-white">{faq.question}</h3>
            <p className="text-gray-300">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQs;
