import { Typography } from '@material-tailwind/react';
import React from 'react';

const Index = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <Typography variant="h2" className="text-3xl font-bold text-center mb-8">
        Privacy Policy
      </Typography>
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold mb-2">1. Introduction</h3>
          <Typography variant="paragraph">
            Your privacy is important to us. This privacy policy explains the
            types of information we collect from you, how we use it, and your
            rights regarding your information.
          </Typography>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-2">
            2. Information We Collect
          </h3>
          <Typography variant="paragraph">
            We may collect personal information such as your name, email
            address, and other contact details when you use our website or
            services.
          </Typography>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-2">
            3. How We Use Your Information
          </h3>
          <Typography variant="paragraph">
            We use your information to provide, maintain, and improve our
            services, to communicate with you, and to personalize your
            experience on our website.
          </Typography>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-2">
            4. Sharing Your Information
          </h3>
          <Typography variant="paragraph">
            We do not sell or rent your personal information to third parties.
            We may share your information with trusted partners who assist us in
            operating our website and conducting our business.
          </Typography>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-2">5. Security</h3>
          <Typography variant="paragraph">
            We implement appropriate security measures to protect your personal
            information from unauthorized access, disclosure, alteration, and
            destruction.
          </Typography>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-2">6. Your Rights</h3>
          <Typography variant="paragraph">
            You have the right to access, correct, or delete your personal
            information. You can also object to or restrict the processing of
            your information.
          </Typography>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-2">
            7. Changes to This Privacy Policy
          </h3>
          <Typography variant="paragraph">
            We may update this privacy policy from time to time. Any changes
            will be effective immediately upon posting on this page.
          </Typography>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-2">8. Contact Us</h3>
          <Typography variant="paragraph">
            If you have any questions or concerns about this privacy policy,
            please contact us at [contact information].
          </Typography>
        </section>
      </div>
    </div>
  );
};

export default Index;
