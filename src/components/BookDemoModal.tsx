import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Building, Mail, Users, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, AlertCircle } from 'lucide-react';
import { DemoFormData } from '../types';
import { DEMO_TIME_SLOTS, getDemoDates, isOfferedDemoDate } from '../../shared/demo-schedule';
import { SUPPORT_EMAIL, supportMailto } from '../support';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookDemoModal: React.FC<BookDemoModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState<DemoFormData>({
    date: '',
    timeSlot: '',
    fullName: '',
    email: '',
    companyName: '',
    teamSize: '10-50',
  });
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>('');
  const [notificationSent, setNotificationSent] = useState(false);

  if (!isOpen) return null;

  const availableDates = getDemoDates();
  const availableTimeSlots = DEMO_TIME_SLOTS;

  const handleNext = async () => {
    setErrorMsg('');

    if (currentStep === 1) {
      if (!isOfferedDemoDate(formData.date)) {
        setErrorMsg('Please select a date for your demo call.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!formData.timeSlot) {
        setErrorMsg('Please select a time slot.');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!formData.fullName.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setErrorMsg('Please enter a valid work email address.');
        return;
      }
      if (!formData.companyName.trim()) {
        setErrorMsg('Please enter your company or gym name.');
        return;
      }

      // Submit booking to production serverless API endpoint
      setIsSubmitting(true);

      try {
        const response = await fetch('/api/book-demo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.bookingSaved && data.bookingId) {
          setConfirmedBookingId(data.bookingId);
          setNotificationSent(data.notificationSent === true);
          setIsSubmitting(false);
          setCurrentStep(4);
          return;
        }

        if (!response.ok || !data.success || !data.bookingId) {
          setErrorMsg(data.message || 'This time slot is no longer available. Please select another time.');
          setIsSubmitting(false);
          return;
        }

        // Successfully booked in database
        setConfirmedBookingId(data.bookingId);
        setNotificationSent(data.notificationSent === true);
        setIsSubmitting(false);
        setCurrentStep(4);
      } catch (err) {
        console.error('Book demo submit error:', err);
        setErrorMsg('Something went wrong. Please check your connection and try again.');
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    setErrorMsg('');
    if (currentStep > 1 && currentStep < 4) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  const resetAndClose = () => {
    setCurrentStep(1);
    setFormData({
      date: '',
      timeSlot: '',
      fullName: '',
      email: '',
      companyName: '',
      teamSize: '10-50',
    });
    setErrorMsg('');
    setConfirmedBookingId('');
    setNotificationSent(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl rounded-3xl bg-cyber-card border border-cyber-cardBorder shadow-2xl p-6 sm:p-8 my-8 text-white"
        >
          {/* Close Button */}
          <button
            onClick={resetAndClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-cyber-bg border border-white/10 hover:border-cyber-lime text-cyber-textMuted hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6 space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-lime/10 border border-cyber-lime/30 text-cyber-lime text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AURA APEX DEMO WIZARD</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {currentStep === 4 ? 'Booking saved' : 'Schedule a 1-on-1 Product Walkthrough'}
            </h2>
            <p className="text-xs sm:text-sm text-cyber-textMuted">
              {currentStep === 1 && 'Step 1: Pick a date that fits your team schedule.'}
              {currentStep === 2 && 'Step 2: Choose your preferred time slot.'}
              {currentStep === 3 && 'Step 3: Provide your details for a tailored walkthrough.'}
              {currentStep === 4 && 'Keep your booking reference for meeting arrangements.'}
            </p>
          </div>

          {/* Progress Indicator (Steps 1, 2, 3) */}
          {currentStep < 4 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                {[
                  { num: 1, title: 'Date' },
                  { num: 2, title: 'Time' },
                  { num: 3, title: 'Details' },
                ].map((step) => (
                  <div key={step.num} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        currentStep === step.num
                          ? 'bg-cyber-lime text-black shadow-lime-glow-sm scale-110'
                          : currentStep > step.num
                          ? 'bg-cyber-lime/30 text-cyber-lime border border-cyber-lime/50'
                          : 'bg-white/5 text-cyber-textMuted border border-white/10'
                      }`}
                    >
                      {currentStep > step.num ? <CheckCircle2 className="w-4 h-4" /> : step.num}
                    </div>
                    <span
                      className={`text-xs font-medium hidden sm:inline ${
                        currentStep === step.num ? 'text-cyber-lime font-bold' : 'text-cyber-textMuted'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyber-lime transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Validation Error Banner */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Step 1: Date Picker */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <label className="text-xs font-mono font-semibold text-cyber-lime uppercase tracking-wider block">
                Select Available Date
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableDates.map((d) => {
                  const isSelected = formData.date === d.value;
                  return (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, date: d.value });
                        setErrorMsg('');
                      }}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-cyber-lime/10 border-cyber-lime text-white shadow-lime-glow-sm'
                          : 'bg-cyber-bg border-white/10 hover:border-cyber-lime/40 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-cyber-lime">{d.day}</span>
                        <Calendar className="w-4 h-4 text-cyber-textMuted" />
                      </div>
                      <div className="text-sm font-semibold mt-1">{d.date}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Time Slot Picker */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-semibold text-cyber-lime uppercase tracking-wider">
                  Select Preferred Time Slot
                </label>
                <span className="text-xs text-cyber-textMuted font-mono">
                  Date: <strong className="text-white">{formData.date}</strong>
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableTimeSlots.map((slot) => {
                  const isSelected = formData.timeSlot === slot.label;
                  return (
                    <button
                      key={slot.label}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, timeSlot: slot.label });
                        setErrorMsg('');
                      }}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-cyber-lime/10 border-cyber-lime text-white shadow-lime-glow-sm'
                          : 'bg-cyber-bg border-white/10 hover:border-cyber-lime/40 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-cyber-textMuted">{slot.period}</span>
                        <Clock className="w-4 h-4 text-cyber-lime" />
                      </div>
                      <div className="text-sm font-semibold mt-1">{slot.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Work Details Form */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-cyber-bg border border-white/10 text-xs font-mono text-cyber-textMuted flex items-center justify-between">
                <span>Selected Schedule:</span>
                <span className="text-cyber-lime font-bold">
                  {formData.date} @ {formData.timeSlot}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Full Name <span className="text-cyber-lime">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-cyber-textMuted" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errorMsg) setErrorMsg('');
                      }}
                      placeholder="Jane Doe"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cyber-bg border border-white/10 text-white text-sm focus:border-cyber-lime focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Work Email <span className="text-cyber-lime">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-cyber-textMuted" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errorMsg) setErrorMsg('');
                      }}
                      placeholder="jane@company.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cyber-bg border border-white/10 text-white text-sm focus:border-cyber-lime focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Company / Gym Name <span className="text-cyber-lime">*</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 w-4 h-4 text-cyber-textMuted" />
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => {
                        setFormData({ ...formData, companyName: e.target.value });
                        if (errorMsg) setErrorMsg('');
                      }}
                      placeholder="Apex Fitness Hub"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cyber-bg border border-white/10 text-white text-sm focus:border-cyber-lime focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Team / Member Count
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 w-4 h-4 text-cyber-textMuted" />
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cyber-bg border border-white/10 text-white text-sm focus:border-cyber-lime focus:outline-none"
                    >
                      <option value="1-10">1-10 Employees / Trainers</option>
                      <option value="10-50">10-50 Employees / Trainers</option>
                      <option value="50-250">50-250 Multi-location</option>
                      <option value="250+">250+ Enterprise Franchise</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Success State */}
          {currentStep === 4 && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-cyber-lime/20 border border-cyber-lime text-cyber-lime flex items-center justify-center mx-auto shadow-lime-glow">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="p-4 rounded-2xl bg-cyber-bg border border-white/10 max-w-md mx-auto text-left space-y-2 text-xs font-mono">
                <div className="text-cyber-lime font-bold border-b border-white/10 pb-2 flex items-center justify-between">
                  <span>BOOKING REFERENCE:</span>
                  <span className="text-cyber-lime">{confirmedBookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyber-textMuted">Attendee:</span>
                  <span className="text-white font-semibold">{formData.fullName} ({formData.email})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyber-textMuted">Organization:</span>
                  <span className="text-white font-semibold">{formData.companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyber-textMuted">Scheduled Time:</span>
                  <span className="text-cyber-lime font-semibold">{formData.date} @ {formData.timeSlot}</span>
                </div>
              </div>

              <p className="text-xs text-cyber-textMuted">
                {notificationSent ? <>Your booking email was accepted for delivery to <strong className="text-white">{formData.email}</strong>. The team will contact you about meeting arrangements.</> : <>Your booking was saved, but email notification could not be confirmed. Do not submit it again. Email <a className="text-cyber-lime underline" href={supportMailto('Aura Apex demo booking', `Booking reference: ${confirmedBookingId}`)}>{SUPPORT_EMAIL}</a> with your booking reference.</>}
              </p>

              <button
                onClick={resetAndClose}
                className="w-full py-3 rounded-xl bg-cyber-lime text-black font-bold text-sm hover:bg-cyber-limeHover transition-all shadow-lime-glow"
              >
                Done &amp; Return to Site
              </button>
            </div>
          )}

          {/* Bottom Action Controls (Steps 1-3) */}
          {currentStep < 4 && (
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyber-bg border border-white/10 text-cyber-textMuted hover:text-white hover:border-white/20 text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyber-lime text-black font-bold text-sm hover:bg-cyber-limeHover transition-all shadow-lime-glow active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    <span>Reserving Slot...</span>
                  </>
                ) : (
                  <>
                    <span>{currentStep === 3 ? 'Confirm & Book Demo' : 'Next Step'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
