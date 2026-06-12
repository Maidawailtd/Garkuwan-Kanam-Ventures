import { useState } from "react";
import { Layout } from "@/components/layout";
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;

  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: c.opt1, message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`${BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: c.opt1, message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full bg-background border border-border px-4 py-3.5 focus:border-primary outline-none transition-colors text-sm";
  const labelClass = "text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-2";

  const infoItems = [
    { icon: <MapPin className="text-primary" size={20} />, label: c.locLabel, val: c.locVal },
    { icon: <Phone className="text-primary" size={20} />, label: c.callLabel, val: "Sales: 08039891568\nWhatsApp: 08039891568" },
    { icon: <Mail className="text-primary" size={20} />, label: c.emailLabel, val: "mglink@mail.com" },
    { icon: <Clock className="text-primary" size={20} />, label: c.hoursLabel, val: c.hoursVal },
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-secondary text-secondary-foreground py-20 md:py-28 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,166,35,0.05),transparent)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="max-w-2xl">
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-5 block">{c.tagline}</span>
            <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-display uppercase tracking-tighter leading-[0.88] text-white">
              {c.title1} <br />
              <span className="text-primary">{c.title2}</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

            {/* Contact Info */}
            <div className="lg:col-span-4 space-y-8">
              <div>
                <h2 className="text-2xl font-display uppercase tracking-tighter mb-7">{c.hqTitle}</h2>
                <div className="space-y-6">
                  {infoItems.map((item) => (
                    <div key={item.label} className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-card border border-border flex items-center justify-center shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold uppercase tracking-widest text-[10px] mb-1.5 text-muted-foreground">{item.label}</h4>
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{item.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-7 bg-primary text-primary-foreground">
                <MessageSquare className="mb-5" size={28} />
                <h4 className="text-lg font-display uppercase mb-3">{c.urgentTitle}</h4>
                <p className="text-sm opacity-80 mb-5 leading-relaxed">{c.urgentText}</p>
                <a
                  href="https://wa.me/2348039891568"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold uppercase tracking-widest border-b-2 border-primary-foreground pb-1 hover:opacity-70 transition-opacity inline-block"
                >
                  {c.urgentLink} →
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-8">
              <div className="bg-card border border-border p-7 md:p-10">
                <h2 className="text-2xl font-display uppercase tracking-tighter mb-8">{c.formTitle}</h2>

                {status === "success" ? (
                  <div className="py-16 text-center">
                    <CheckCircle className="text-green-500 mx-auto mb-5" size={52} />
                    <h3 className="text-xl font-display uppercase tracking-widest mb-3">{c.successTitle}</h3>
                    <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-8">{c.successText}</p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-[11px] font-bold uppercase tracking-widest text-primary border-b border-primary pb-0.5 hover:opacity-70 transition-opacity"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>{c.nameLbl} *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={set("name")}
                          placeholder="John Adeyemi"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>{c.emailLbl} *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={set("email")}
                          placeholder="john@company.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>{c.phoneLbl}</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={set("phone")}
                          placeholder="+234 803 989 1568"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>{c.subjectLbl}</label>
                        <select value={form.subject} onChange={set("subject")} className={`${inputClass} cursor-pointer appearance-none`}>
                          <option>{c.opt1}</option>
                          <option>{c.opt2}</option>
                          <option>{c.opt3}</option>
                          <option>{c.opt4}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>{c.msgLbl} *</label>
                      <textarea
                        required
                        value={form.message}
                        onChange={set("message")}
                        rows={6}
                        placeholder="How can we help your operation?"
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {status === "error" && (
                      <div className="flex items-start gap-3 p-4 bg-destructive/5 border border-destructive/20 text-sm text-destructive">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        <span>{c.errorText}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full bg-primary text-primary-foreground py-4 font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-foreground hover:text-background transition-all duration-300 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "sending" ? (
                        <>
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                          </svg>
                          {c.sending}
                        </>
                      ) : (
                        <>{c.sendBtn} <Send size={16} /></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Embed — Lagos, Victoria Island */}
      <section className="border-t border-border">
        <iframe
          title="Garkuwan Kanam & Co Ventures Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7277591217217!2d3.4213!3d6.4281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53280b74f31%3A0xa9a1acb6aaa2b3d5!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000"
          width="100%"
          height="380"
          style={{ border: 0, filter: "grayscale(0.7) contrast(1.1)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </Layout>
  );
}
