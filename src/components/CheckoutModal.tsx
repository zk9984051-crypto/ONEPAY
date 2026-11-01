import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRight, QrCode, Smartphone, CreditCard, Lock, RefreshCw, AlertCircle, PhoneCall } from 'lucide-react';
import { CartItem, PaymentMethod, PaymentDetail, Order, ShippingAddress } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { PAKISTANI_CITIES } from '../data/initialProducts';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const { language, t } = useLanguage();

  // Step 1: Customer details, Step 2: Payment Gateway, Step 3: USSD/MPIN Simulation
  const [step, setStep] = useState<'details' | 'payment' | 'authenticating'>('details');

  // Customer Shipping form
  const [fullName, setFullName] = useState('Ahmed Khan');
  const [phone, setPhone] = useState('0302-8765432');
  const [city, setCity] = useState('Lahore');
  const [address, setAddress] = useState('House 42, Street 7, Sector Y, DHA Phase 3');
  const [nearLandmark, setNearLandmark] = useState('Near Lalik Jan Chowk');
  const [notes, setNotes] = useState('');

  // Payment Selection
  const [selectedGateway, setSelectedGateway] = useState<PaymentMethod>('easypaisa');
  const [epVariant, setEpVariant] = useState<'mobile_account' | 'qr_scan' | 'till_code'>('mobile_account');
  const [jcVariant, setJcVariant] = useState<'mobile_account' | 'qr_scan' | 'voucher'>('mobile_account');

  // Payment Input Details
  const [epMobile, setEpMobile] = useState('0345-5678912');
  const [jcMobile, setJcMobile] = useState('0300-9876543');
  const [jcCnic6, setJcCnic6] = useState('456789');

  // Interactive PIN simulation states
  const [pinInput, setPinInput] = useState('');
  const [authProcessing, setAuthProcessing] = useState(false);
  const [countdown, setCountdown] = useState(60);

  if (!isOpen || items.length === 0) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 50000 ? 0 : 250;
  const totalAmount = subtotal + deliveryFee;

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      alert(language === 'ur' ? 'براہ کرم ڈیلیوری ایڈریس اور موبائل نمبر درج کریں۔' : 'Please provide full name, phone number, and delivery address.');
      return;
    }
    setStep('payment');
  };

  const handleAuthorizeGateway = () => {
    setStep('authenticating');
    setPinInput('');
  };

  const handleConfirmTransaction = () => {
    setAuthProcessing(true);

    setTimeout(() => {
      setAuthProcessing(false);

      const timestamp = new Date().toISOString();
      const orderNumber = `ZS-${Math.floor(100000 + Math.random() * 900000)}`;
      const randomTrxNumber = Math.floor(1000000000 + Math.random() * 9000000000);

      let paymentDetail: PaymentDetail;

      if (selectedGateway === 'easypaisa') {
        paymentDetail = {
          method: 'easypaisa',
          mobileNumber: epMobile,
          accountTitle: `${fullName} (EasyPaisa Wallet)`,
          transactionId: `EP${randomTrxNumber}`,
          authMethod: epVariant,
          status: 'success',
          timestamp,
        };
      } else if (selectedGateway === 'jazzcash') {
        paymentDetail = {
          method: 'jazzcash',
          mobileNumber: jcMobile,
          cnicLast6: jcCnic6,
          accountTitle: `${fullName} (JazzCash Account)`,
          transactionId: `JC${randomTrxNumber}`,
          authMethod: jcVariant,
          status: 'success',
          timestamp,
        };
      } else {
        paymentDetail = {
          method: 'cod',
          advanceVerificationPhone: phone,
          status: 'pending_on_delivery',
          timestamp,
        };
      }

      const shippingAddress: ShippingAddress = {
        fullName,
        phone,
        city,
        address,
        nearLandmark,
        notes,
      };

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        items: [...items],
        subtotal,
        deliveryFee,
        total: totalAmount,
        shippingAddress,
        paymentMethod: selectedGateway,
        paymentDetail,
        orderDate: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'Paid & Confirmed',
        trackingNumber: `TCS-${Math.floor(10000000 + Math.random() * 90000000)}`,
      };

      onOrderSuccess(newOrder);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>
                {step === 'details'
                  ? (language === 'ur' ? 'ڈیلیوری اور چیک آؤٹ' : 'Shipping & Checkout')
                  : step === 'payment'
                  ? (language === 'ur' ? 'ایزی پیسہ اور جاز کیش ادائیگی' : 'Select EasyPaisa / JazzCash Gateway')
                  : (language === 'ur' ? 'موبائل سیکیورٹی تصدیق' : 'Mobile Security Authentication')}
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Total Amount: <span className="font-mono font-bold text-slate-900">PKR {totalAmount.toLocaleString('en-PK')}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* STEP 1: SHIPPING DETAILS */}
          {step === 'details' && (
            <form onSubmit={handleStartPayment} className="space-y-4">
              {/* Order preview strip */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Order Summary ({items.length} item{items.length > 1 ? 's' : ''})
                </span>
                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center text-xs">
                      <span className="truncate max-w-[280px] font-medium text-slate-800">
                        {item.quantity}x {item.product.title}
                      </span>
                      <span className="font-mono text-slate-900 tabular-nums">
                        PKR {(item.product.price * item.quantity).toLocaleString('en-PK')}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-xs">
                  <span className="text-slate-500">Delivery Fee (TCS Courier):</span>
                  <span className="font-mono font-medium text-slate-700">
                    {deliveryFee === 0 ? 'FREE' : `PKR ${deliveryFee}`}
                  </span>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'ur' ? 'خریدار کا پورا نام *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ahmed Khan"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'ur' ? 'موبائل نمبر (SMS نوٹیفکیشن کے لیے) *' : 'Mobile Phone (For Alerts) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('city')} *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 cursor-pointer"
                  >
                    {PAKISTANI_CITIES.filter((c) => !c.includes('All')).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'ur' ? 'قریبی معروف مقام (اختیاری)' : 'Famous Landmark'}
                  </label>
                  <input
                    type="text"
                    value={nearLandmark}
                    onChange={(e) => setNearLandmark(e.target.value)}
                    placeholder="Near Lalik Jan Chowk"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'ur' ? 'مکمل ڈیلیوری پتہ (گھر / آفس) *' : 'Complete Delivery Address *'}
                </label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, House No, Sector, Block, Area..."
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition-colors flex items-center gap-2"
                >
                  <span>{language === 'ur' ? 'ادائیگی کے طریقہ کار پر جائیں' : 'Proceed to Payment Gateway'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: GATEWAY SELECTION (EASYPAISA / JAZZCASH / COD) */}
          {step === 'payment' && (
            <div className="space-y-5">
              {/* Gateway Selector Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-xl">
                {/* EasyPaisa Tab */}
                <button
                  type="button"
                  onClick={() => setSelectedGateway('easypaisa')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                    selectedGateway === 'easypaisa'
                      ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[11px] uppercase tracking-wider">EasyPaisa</span>
                  <span className="text-[10px] font-normal opacity-90">ایزی پیسہ والٹ</span>
                </button>

                {/* JazzCash Tab */}
                <button
                  type="button"
                  onClick={() => setSelectedGateway('jazzcash')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                    selectedGateway === 'jazzcash'
                      ? 'bg-rose-700 text-white shadow-sm ring-2 ring-rose-700'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[11px] uppercase tracking-wider">JazzCash</span>
                  <span className="text-[10px] font-normal opacity-90">جاز کیش اکاؤنٹ</span>
                </button>

                {/* Cash on Delivery Tab */}
                <button
                  type="button"
                  onClick={() => setSelectedGateway('cod')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                    selectedGateway === 'cod'
                      ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-900'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[11px] uppercase tracking-wider">Cash on Delivery</span>
                  <span className="text-[10px] font-normal opacity-90">کیش آن ڈیلیوری</span>
                </button>
              </div>

              {/* EASYPAISA GATEWAY INTERFACE */}
              {selectedGateway === 'easypaisa' && (
                <div className="p-4.5 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
                        EP
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">EasyPaisa Direct Gateway</h4>
                        <span className="text-[11px] text-emerald-800">Telenor Microfinance Bank · Instant SBP Escrow</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                      Fee: PKR 0
                    </span>
                  </div>

                  {/* Sub-variant toggle */}
                  <div className="flex gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setEpVariant('mobile_account')}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                        epVariant === 'mobile_account'
                          ? 'bg-emerald-600 text-white font-semibold'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      Mobile Account (USSD / OTP)
                    </button>
                    <button
                      type="button"
                      onClick={() => setEpVariant('qr_scan')}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                        epVariant === 'qr_scan'
                          ? 'bg-emerald-600 text-white font-semibold'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      EasyPaisa QR Code
                    </button>
                  </div>

                  {epVariant === 'mobile_account' ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          EasyPaisa Registered Mobile Number
                        </label>
                        <input
                          type="text"
                          value={epMobile}
                          onChange={(e) => setEpMobile(e.target.value)}
                          placeholder="0345-XXXXXXX or 03XX-XXXXXXX"
                          className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                        />
                        <p className="text-[11px] text-slate-500 mt-1">
                          Any mobile network (Telenor, Jazz, Zong, Ufone) registered with EasyPaisa is accepted.
                        </p>
                      </div>

                      <div className="p-3 bg-white rounded-lg border border-emerald-200 text-xs text-slate-600 flex items-start gap-2">
                        <Smartphone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>
                          Upon clicking <strong>Authenticate & Pay</strong>, an interactive prompt will simulate an in-app PIN approval request on your phone.
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* QR CODE MODE */
                    <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col items-center text-center space-y-3">
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-300">
                        {/* Dynamic Stylized QR code representation */}
                        <div className="w-36 h-36 bg-slate-900 rounded flex flex-col items-center justify-center text-white p-2">
                          <QrCode className="w-24 h-24 text-emerald-400" />
                          <span className="text-[9px] font-mono tracking-wider mt-1 text-slate-300">
                            EP-MERCHANT-ZSPAY
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900">
                          Scan with EasyPaisa App
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Open EasyPaisa App &gt; Tap "Scan QR" &gt; Point at screen to approve PKR {totalAmount.toLocaleString('en-PK')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* JAZZCASH GATEWAY INTERFACE */}
              {selectedGateway === 'jazzcash' && (
                <div className="p-4.5 bg-rose-50/50 rounded-xl border border-rose-200 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-rose-200">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-rose-700 text-white flex items-center justify-center font-black text-sm">
                        JC
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">JazzCash Mobile Gateway</h4>
                        <span className="text-[11px] text-rose-800">Mobilink Microfinance Bank · Direct Payment API</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-rose-900 bg-rose-100 px-2 py-0.5 rounded">
                      Fee: PKR 0
                    </span>
                  </div>

                  {/* Sub-variant toggle */}
                  <div className="flex gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setJcVariant('mobile_account')}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                        jcVariant === 'mobile_account'
                          ? 'bg-rose-700 text-white font-semibold'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      JazzCash Mobile Account (*786#)
                    </button>
                    <button
                      type="button"
                      onClick={() => setJcVariant('qr_scan')}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                        jcVariant === 'qr_scan'
                          ? 'bg-rose-700 text-white font-semibold'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      JazzCash QR Scan
                    </button>
                  </div>

                  {jcVariant === 'mobile_account' ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Jazz / Warid Mobile Number
                          </label>
                          <input
                            type="text"
                            value={jcMobile}
                            onChange={(e) => setJcMobile(e.target.value)}
                            placeholder="0300-XXXXXXX"
                            className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            CNIC Last 6 Digits (Auth)
                          </label>
                          <input
                            type="text"
                            maxLength={6}
                            value={jcCnic6}
                            onChange={(e) => setJcCnic6(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="e.g. 456789"
                            className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                          />
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-lg border border-rose-200 text-xs text-slate-600 flex items-start gap-2">
                        <Smartphone className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>
                          Simulates the real JazzCash USSD prompt popup on mobile: you will approve with your 4-digit secret MPIN on the next screen.
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* JAZZCASH QR CODE */
                    <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col items-center text-center space-y-3">
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-300">
                        <div className="w-36 h-36 bg-slate-900 rounded flex flex-col items-center justify-center text-white p-2">
                          <QrCode className="w-24 h-24 text-rose-400" />
                          <span className="text-[9px] font-mono tracking-wider mt-1 text-slate-300">
                            JC-MERCHANT-ZSPAY
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900">
                          Scan with JazzCash App
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Open JazzCash App &gt; Select "Scan & Pay" &gt; Scan code to transfer PKR {totalAmount.toLocaleString('en-PK')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* CASH ON DELIVERY INTERFACE */}
              {selectedGateway === 'cod' && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <CheckCircle2 className="w-4 h-4 text-slate-700" />
                    <span>Pay Cash to TCS Courier at Delivery</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Pay cash upon delivery at your doorstep in {city}. An automated verification call will be placed to <strong>{phone}</strong> before parcel dispatch.
                  </p>
                </div>
              )}

              {/* Action buttons */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  ← Back to Details
                </button>

                <button
                  type="button"
                  onClick={handleAuthorizeGateway}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs text-white shadow-md transition-colors flex items-center gap-2 ${
                    selectedGateway === 'easypaisa'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : selectedGateway === 'jazzcash'
                      ? 'bg-rose-700 hover:bg-rose-800'
                      : 'bg-slate-900 hover:bg-slate-800'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>
                    {selectedGateway === 'cod'
                      ? 'Confirm COD Order'
                      : `Authorize with ${selectedGateway === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'}`}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: INTERACTIVE AUTHENTICATION & PIN SIMULATION (USSD / PUSH) */}
          {step === 'authenticating' && (
            <div className="space-y-5 text-center">
              {authProcessing ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-4">
                  <RefreshCw className="w-10 h-10 text-emerald-600 animate-spin" />
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900">
                      Processing Payment with {selectedGateway === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'}...
                    </h4>
                    <p className="text-xs text-slate-500">
                      Verifying with State Bank 1Link Core Banking Switch...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="max-w-md mx-auto space-y-4">
                  {/* SIMULATED MOBILE PROMPT */}
                  <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl border border-slate-800 text-left space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-mono text-emerald-400">
                        {selectedGateway === 'easypaisa' ? 'EasyPaisa Mobile Notification' : 'JazzCash *786# USSD Prompt'}
                      </span>
                      <span className="text-[10px] text-slate-400">SIM 1 · LIVE</span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-200">
                      <p>
                        <strong>Merchant:</strong> ZsPay Pakistan (Pvt) Ltd
                      </p>
                      <p>
                        <strong>Amount:</strong> PKR {totalAmount.toLocaleString('en-PK')}
                      </p>
                      <p>
                        <strong>Account:</strong> {selectedGateway === 'easypaisa' ? epMobile : jcMobile}
                      </p>
                      <p className="text-amber-300 text-[11px] pt-1">
                        {selectedGateway === 'easypaisa'
                          ? 'Enter your 5-digit Secret EasyPaisa PIN or tap Authorize'
                          : 'Enter your 4-digit JazzCash MPIN to approve payment:'}
                      </p>
                    </div>

                    {/* Interactive PIN Box */}
                    <div className="pt-2">
                      <input
                        type="password"
                        maxLength={selectedGateway === 'easypaisa' ? 5 : 4}
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder={selectedGateway === 'easypaisa' ? '• • • • •' : '• • • •'}
                        className="w-full text-center tracking-[0.5em] text-lg font-mono py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      />
                    </div>
                  </div>

                  {/* Quick interactive buttons */}
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={handleConfirmTransaction}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm & Authorize Payment (PKR {totalAmount.toLocaleString('en-PK')})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep('payment')}
                      className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      Cancel and choose different method
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
