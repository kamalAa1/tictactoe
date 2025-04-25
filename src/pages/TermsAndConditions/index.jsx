import { Typography } from '@material-tailwind/react';
import React from 'react';

const Index = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Terms and Conditions
      </h2>
      <div className="space-y-6">
        <section>
          <Typography variant="h3" className="text-xl font-semibold mb-2">
            1. Introduction
          </Typography>
          <Typography variant="paragraph">
            Welcome to our game website. By accessing and using our website, you
            agree to comply with and be bound by the following terms and
            conditions. Please review them carefully.
          </Typography>
        </section>
        <section>
          <Typography className="text-xl font-semibold mb-2">
            2. Use of the Website
          </Typography>
          <Typography variant="paragraph">
            You agree to use the website in accordance with all applicable laws
            and regulations. You shall not use the website for any unlawful or
            prohibited purposes.
          </Typography>
        </section>
        <section>
          <Typography className="text-xl font-semibold mb-2">
            3. Intellectual Property
          </Typography>
          <Typography variant="paragraph">
            All content on this website, including text, graphics, logos, and
            images, is the property of the website owner and is protected by
            intellectual property laws.
          </Typography>
        </section>
        <section>
          <Typography className="text-xl font-semibold mb-2">
            4. User Accounts
          </Typography>
          <Typography variant="paragraph">
            If you create an account on our website, you are responsible for
            maintaining the confidentiality of your account information and for
            all activities that occur under your account.
          </Typography>
        </section>
        <section>
          <Typography className="text-xl font-semibold mb-2">
            5. Limitation of Liability
          </Typography>
          <Typography variant="paragraph">
            We shall not be liable for any damages arising out of your use of
            the website or any information, services, or products provided
            through the website.
          </Typography>
        </section>
        <section>
          <Typography className="text-xl font-semibold mb-2">
            6. Changes to the Terms
          </Typography>
          <Typography variant="paragraph">
            We reserve the right to modify these terms and conditions at any
            time. Any changes will be effective immediately upon posting on the
            website.
          </Typography>
        </section>
        <section>
          <Typography className="text-xl font-semibold mb-2">
            7. Contact Information
          </Typography>
          <Typography variant="paragraph">
            If you have any questions about these terms and conditions, please
            contact us at [contact information].
          </Typography>
        </section>
      </div>
    </div>
  );
};

export default Index;
