import PageHeader from '../components/PageHeader';
import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaResearchgate,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { SiAcademia, SiGooglescholar } from "react-icons/si";
import { 
  HiOutlineAcademicCap, 
  HiOutlineLocationMarker, 
  HiOutlineCheckCircle
} from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { fetchSocialLinks } from "../../sanityApiClient/useSanityClient";
import { useAuthorContext } from "../hooks/AuthorContext";

export interface SocialLinks {
  _id: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  snapchat?: string;
  email?: string;
  researchgate?: string;
  academiaEdu?: string;
  googlescholar?: string;
  telegram?: string;
  whatsapp?: string;
}

const fetchSocialLinksData = async (): Promise<SocialLinks[]> => {
  const socialLinks = await fetchSocialLinks();
  return socialLinks || [];
};

const ContactPage: React.FC = () => {
  const { data: socialLinks = [] } = useQuery<SocialLinks[]>({
    queryKey: ["socialLinks"],
    queryFn: fetchSocialLinksData,
  });

  const { authorName } = useAuthorContext();
  const displayName = authorName || "Professor Mina Margaret Ogbanga";

  const [inquiryType, setInquiryType] = useState("Keynote Address & Guest Lecture");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    eventDate: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = `Engagements & Contact - ${displayName}`;
  }, [displayName]);

  const social = socialLinks[0] || {};
  const recipientEmail = social.email || "info@minaogbanga.com";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[${inquiryType}] Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Organization / Institution: ${formData.organization}\n` +
      `Proposed Timeline / Date: ${formData.eventDate || "Flexible"}\n` +
      `Inquiry Category: ${inquiryType}\n\n` +
      `Message Details:\n${formData.message}`
    );

    // Open email client with pre-formatted structure
    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  return (
    <section className="page-shell">
      <div className="site-wrap">
        {/* Header */}
        <PageHeader
          eyebrow="Speaking & Consultations"
          title="Engagements, Advisory & Contact"
          description={`Invite ${displayName} for keynote lectures, policy advisory, research collaborations, or international conference panels.`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Structured Engagement Form */}
          <div className="lg:col-span-7 surface-card p-6 md:p-8">
            <h2 className="text-xl font-bold text-ink font-serif mb-1">
              Submit an Invitation or Inquiry
            </h2>
            <p className="text-xs text-muted mb-6">
              Please specify the scope, proposed dates, and institutional context for the promptest response.
            </p>

            {isSubmitted ? (
              <div className="bg-accent-soft border border-line rounded p-5 text-center space-y-3" role="status">
                <HiOutlineCheckCircle className="text-accent-strong text-4xl mx-auto" />
                <h3 className="text-accent-strong font-bold text-base">Inquiry Prepared</h3>
                <p className="text-xs text-muted max-w-md mx-auto">
                  Your draft is ready to review and send in your email app. You can also email{' '}
                  <a href={`mailto:${recipientEmail}`} className="text-accent-strong underline font-semibold">
                    {recipientEmail}
                  </a>.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-semibold text-muted hover:text-navy bg-accent-soft px-4 py-2 rounded-lg mt-2"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Inquiry Type */}
                <div>
                  <label htmlFor="inquiry-category" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                    Engagement Category
                  </label>
                  <select
                    id="inquiry-category"
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-cream border border-field rounded-xl px-4 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option>Keynote Address & Guest Lecture</option>
                    <option>Environmental & Climate Policy Advisory</option>
                    <option>Academic & Research Collaboration</option>
                    <option>Press & Media Interview</option>
                    <option>General Academic Inquiry</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="inquiry-name" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      id="inquiry-name"
                      autoComplete="name"
                      type="text"
                      required
                      placeholder="e.g. Dr. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-cream border border-field rounded-xl px-4 py-2.5 text-sm text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="inquiry-email" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                      Official Email *
                    </label>
                    <input
                      id="inquiry-email"
                      autoComplete="email"
                      type="email"
                      required
                      placeholder="e.g. j.doe@university.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-cream border border-field rounded-xl px-4 py-2.5 text-sm text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Organization */}
                  <div>
                    <label htmlFor="inquiry-organization" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                      Organization / University
                    </label>
                    <input
                      id="inquiry-organization"
                      autoComplete="organization"
                      type="text"
                      placeholder="e.g. United Nations / Oxford"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full bg-cream border border-field rounded-xl px-4 py-2.5 text-sm text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  {/* Proposed Date */}
                  <div>
                    <label htmlFor="inquiry-date" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                      Proposed Date / Timeline
                    </label>
                    <input
                      id="inquiry-date"
                      type="text"
                      placeholder="e.g. Q4 2026 / November 15"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full bg-cream border border-field rounded-xl px-4 py-2.5 text-sm text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="inquiry-message" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                    Engagement Details / Agenda *
                  </label>
                  <textarea
                    id="inquiry-message"
                    required
                    rows={4}
                    placeholder="Describe the occasion, audience profile, topic objectives, or collaboration goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-cream border border-field rounded-xl p-4 text-sm text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <button
                  type="submit"
                  className="site-button w-full"
                >
                  Open Email Draft
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Academic Networks & Affiliations */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Academic Profiles Card */}
            <div className="surface-card p-6 space-y-4">
              <h2 className="text-lg text-navy font-serif flex items-center gap-2">
                <HiOutlineAcademicCap className="text-accent-strong text-lg" />
                Scholarly Repositories & Profiles
              </h2>
              <p className="text-xs text-muted">
                Explore publication indices, citation metrics, and peer connections:
              </p>

              <div className="space-y-2">
                {social.googlescholar && (
                  <a
                    href={social.googlescholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-cream border border-line hover:border-accent hover:bg-accent-soft transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-accent-soft text-accent-strong group-hover:scale-110 transition-transform">
                        <SiGooglescholar size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink">Google Scholar</p>
                        <p className="text-[11px] text-muted">Citations & Academic Index</p>
                      </div>
                    </div>
                    <span className="text-xs text-accent-strong font-medium">View &rarr;</span>
                  </a>
                )}

                {social.researchgate && (
                  <a
                    href={social.researchgate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-cream border border-line hover:border-line hover:bg-accent-soft transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-accent-soft text-accent-strong group-hover:scale-110 transition-transform">
                        <FaResearchgate size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink">ResearchGate</p>
                        <p className="text-[11px] text-muted">Peer Publications & Discussion</p>
                      </div>
                    </div>
                    <span className="text-xs text-accent-strong font-medium">View &rarr;</span>
                  </a>
                )}

                {social.academiaEdu && (
                  <a
                    href={social.academiaEdu}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-cream border border-line hover:border-line hover:bg-accent-soft transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-paper text-muted group-hover:scale-110 transition-transform">
                        <SiAcademia size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink">Academia.edu</p>
                        <p className="text-[11px] text-muted">Scholarly Papers & Research</p>
                      </div>
                    </div>
                    <span className="text-xs text-accent-strong font-medium">View &rarr;</span>
                  </a>
                )}

                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-cream border border-line hover:border-line hover:bg-accent-soft transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-accent-soft text-accent-strong group-hover:scale-110 transition-transform">
                        <FaLinkedinIn size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink">LinkedIn Profile</p>
                        <p className="text-[11px] text-muted">Executive & Professional Network</p>
                      </div>
                    </div>
                    <span className="text-xs text-accent-strong font-medium">Connect &rarr;</span>
                  </a>
                )}
              </div>
            </div>

            {/* Direct Contacts & Institutional Office */}
            <div className="surface-card p-6 space-y-4">
              <h2 className="text-lg text-navy font-serif flex items-center gap-2">
                <HiOutlineLocationMarker className="text-gold-ink text-lg" />
                Institutional Affiliations
              </h2>
              <div className="space-y-3 text-xs text-muted">
                <div className="p-3 rounded-xl bg-cream border border-line">
                  <p className="font-semibold text-ink">Rivers State University (RSU)</p>
                  <p className="text-muted mt-0.5">Centre for Water and Sanitation Studies</p>
                  <p className="text-[11px] text-muted">Port Harcourt, Rivers State, Nigeria</p>
                </div>

                <div className="p-3 rounded-xl bg-cream border border-line">
                  <p className="font-semibold text-ink">Indiana University–Purdue University Indianapolis (IUPUI)</p>
                  <p className="text-muted mt-0.5">Global Associate, School of Social Work</p>
                </div>

                <div className="p-3 rounded-xl bg-cream border border-line">
                  <p className="font-semibold text-ink">Direct Office Email</p>
                  <a href={`mailto:${recipientEmail}`} className="text-accent-strong font-semibold underline block mt-0.5">
                    {recipientEmail}
                  </a>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="pt-2 flex items-center gap-2 flex-wrap">
                {social.whatsapp && (
                  <a
                    href={social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-accent-soft text-accent-strong border border-line hover:bg-accent-soft transition-colors"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp size={18} />
                  </a>
                )}
                {social.twitter && (
                  <a
                    href={social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-cream text-accent-strong border border-line hover:bg-accent-soft transition-colors"
                    aria-label="Twitter / X"
                  >
                    <FaTwitter size={18} />
                  </a>
                )}
                {social.facebook && (
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-cream text-accent-strong border border-line hover:bg-accent-soft transition-colors"
                    aria-label="Facebook"
                  >
                    <FaFacebookF size={18} />
                  </a>
                )}
                {social.instagram && (
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-cream text-pink-400 border border-line hover:bg-accent-soft transition-colors"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={18} />
                  </a>
                )}
                {social.telegram && (
                  <a
                    href={social.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-cream text-accent-strong border border-line hover:bg-accent-soft transition-colors"
                    aria-label="Telegram"
                  >
                    <FaTelegramPlane size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
