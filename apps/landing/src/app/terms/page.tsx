import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions – IIS Academy",
  description:
    "IIS Academy Terms and Conditions, including copyright and legal compliance information.",
};

export default function TermsPage() {
  return (
    <>
      <main
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "3rem 1.5rem 4rem",
          fontFamily: "inherit",
          color: "#1a1a2e",
          lineHeight: 1.75,
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "#1a237e",
            marginBottom: "0.5rem",
          }}
        >
          Terms &amp; Conditions
        </h1>
        <p style={{ color: "#546e7a", marginBottom: "2.5rem", fontSize: "0.9rem" }}>
          Last updated: {new Date().getFullYear()}
        </p>

        <Section title="1. Acceptance of Terms">
          By accessing or using IIS Academy, you agree to be bound by these
          Terms and Conditions. If you do not agree, please discontinue use of
          the platform immediately.
        </Section>

        <Section title="2. Copyright &amp; Intellectual Property">
          <p>
            IIS Academy portal uses original enhancement lessons built around
            official syllabi. Copyright in all referenced material belongs to
            its respective authors and boards. We assume students have legally
            purchased their textbooks and possess rights to study. If you are a
            copyright holder or authority and believe any content is improperly
            reproduced, please contact us at{" "}
            <a
              href="mailto:support@iisacademy.com"
              style={{ color: "#1a237e" }}
            >
              support@iisacademy.com
            </a>{" "}
            for immediate review and removal if required. IIS Academy does not
            substitute or reproduce copyrighted material without appropriate
            licensing.
          </p>
        </Section>

        <Section title="3. Enhancement Content Disclaimer">
          Textbook content belongs exclusively to its respective authors and
          authorities. Lessons provided on this platform are solely enhancement
          material. It is assumed that students have purchased the official
          textbooks and have a legitimate right to study from them. IIS Academy
          only delivers supplementary content and does not reproduce copyrighted
          material without license.
        </Section>

        <Section title="4. User Responsibilities">
          <ul style={{ paddingLeft: "1.25rem", margin: 0 }}>
            <li>
              You must be a registered user or have been granted access by an
              authorised institution.
            </li>
            <li>
              You are responsible for ensuring that your use of the platform
              complies with all applicable laws.
            </li>
            <li>
              You must not share, distribute, or commercially exploit any
              content provided by IIS Academy without prior written permission.
            </li>
            <li>
              You confirm that you have legally obtained the textbooks
              corresponding to the enhancement lessons you access.
            </li>
          </ul>
        </Section>

        <Section title="5. Limitation of Liability">
          IIS Academy provides its enhancement content on an &quot;as is&quot; basis
          without warranties of any kind. We shall not be liable for any
          indirect, incidental, or consequential damages arising from your use
          of the platform.
        </Section>

        <Section title="6. Changes to These Terms">
          We reserve the right to update these Terms and Conditions at any time.
          Continued use of IIS Academy after any changes constitutes acceptance
          of the revised terms.
        </Section>

        <Section title="7. Contact Us">
          If you have any questions about these Terms &amp; Conditions or wish
          to report a copyright concern, please contact us at{" "}
          <a
            href="mailto:support@iisacademy.com"
            style={{ color: "#1a237e" }}
          >
            support@iisacademy.com
          </a>
          .
        </Section>
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <h2
        style={{
          fontSize: "1.15rem",
          fontWeight: 700,
          color: "#1a237e",
          marginBottom: "0.5rem",
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {typeof children === "string" ? (
        <p style={{ margin: 0 }}>{children}</p>
      ) : (
        <div>{children}</div>
      )}
    </section>
  );
}
