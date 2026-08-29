import { useState } from "react";
import { X, CheckCircle2, FileText, Upload, Paperclip } from "lucide-react";
import { addAllergy, addLabReport, addPrescription, addVisit } from "../../../services/recordsService";
import type { Tab } from "../../../types/patient";

export function AddRecordModal({
  onClose,
  onSaved,
  defaultType,
  patientId,
}: {
  onClose: () => void;
  onSaved: () => void;
  defaultType: Tab;
  patientId: string;
}) {
  const [type, setType] = useState<string>(defaultType === "dashboard" ? "prescriptions" : defaultType);
  const [uploadMode, setUploadMode] = useState<"manual" | "upload">("manual");
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);
    const form = new FormData(e.currentTarget);
    try {
      if (type === "prescriptions") await addPrescription(patientId, form);
      else if (type === "labs") await addLabReport(patientId, form);
      else if (type === "visits") await addVisit(patientId, form);
      else await addAllergy(patientId, form);

      setDone(true);
      onSaved();
      setTimeout(onClose, 1300);
    } catch {
      setSaveError("Couldn't save this record. Check the fields and try again.");
    } finally {
      setSaving(false);
    }
  }

  const inputCls = "w-full px-3 py-2.5 rounded-lg border border-border bg-input-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";
  const labelCls = "block text-xs font-medium text-muted-foreground mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ background: "rgba(15,17,23,0.5)" }}>
      <div className="bg-card border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <div>
            <h3 className="text-base font-semibold text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>Add New Record</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Linked to your patient profile</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"><X size={15} /></button>
        </div>

        {done ? (
          <div className="flex flex-col items-center justify-center py-12 px-5 gap-3">
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-2">
              <CheckCircle2 size={28} className="text-emerald-600" />
            </div>
            <div className="text-base font-semibold text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>Record saved successfully</div>
            <div className="text-sm text-muted-foreground text-center">Your record has been added to your patient profile.</div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="overflow-y-auto flex-1">
            <div className="p-5 space-y-4">
              <div>
                <label className={labelCls}>Record Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className={inputCls} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <option value="prescriptions">Prescription</option>
                  <option value="labs">Lab Report</option>
                  <option value="visits">Visit Record</option>
                  <option value="allergies">Allergy</option>
                </select>
              </div>
              <div className="flex gap-1 p-1 bg-muted rounded-lg">
                {(["manual", "upload"] as const).map((m) => (
                  <button key={m} type="button" onClick={() => setUploadMode(m)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                      uploadMode === m ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {m === "manual" ? <><FileText size={12} /> Manual Entry</> : <><Upload size={12} /> Upload Document</>}
                  </button>
                ))}
              </div>
              {uploadMode === "upload" ? (
                <div className="border-2 border-dashed border-border rounded-xl py-10 flex flex-col items-center gap-3 text-center">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Paperclip size={18} className="text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground mb-0.5">Document upload isn't available yet</div>
                    <div className="text-xs text-muted-foreground">Use Manual Entry for now — the API has no document endpoint.</div>
                  </div>
                </div>
              ) : (
                <>
                  {type === "prescriptions" && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className={labelCls}>Medicine Name</label><input name="medicine" type="text" placeholder="e.g. Metformin HCl" className={inputCls} required /></div>
                        <div><label className={labelCls}>Dosage</label><input name="dosage" type="text" placeholder="e.g. 500 mg" className={inputCls} required /></div>
                      </div>
                      <div><label className={labelCls}>Frequency</label><input name="frequency" type="text" placeholder="e.g. Twice daily with meals" className={inputCls} required /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className={labelCls}>Duration</label><input name="duration" type="text" placeholder="e.g. 30 days" className={inputCls} /></div>
                        <div><label className={labelCls}>Refills</label><input name="refills" type="number" placeholder="0" min="0" className={inputCls} /></div>
                      </div>
                      <div><label className={labelCls}>Prescribing Doctor</label><input name="doctor" type="text" placeholder="e.g. Dr. Priya Mehta" className={inputCls} required /></div>
                      <div><label className={labelCls}>Facility / Clinic</label><input name="facility" type="text" placeholder="e.g. Sunrise Family Clinic" className={inputCls} /></div>
                    </div>
                  )}
                  {type === "labs" && (
                    <div className="space-y-3">
                      <div><label className={labelCls}>Test Name</label><input name="testName" type="text" placeholder="e.g. Fasting Blood Glucose" className={inputCls} required /></div>
                      <div className="grid grid-cols-3 gap-3">
                        <div><label className={labelCls}>Result</label><input name="result" type="text" placeholder="118" className={inputCls} required /></div>
                        <div><label className={labelCls}>Unit</label><input name="unit" type="text" placeholder="mg/dL" className={inputCls} /></div>
                        <div><label className={labelCls}>Reference</label><input name="referenceRange" type="text" placeholder="70-99" className={inputCls} /></div>
                      </div>
                      <div><label className={labelCls}>Lab / Facility</label><input name="lab" type="text" placeholder="e.g. Quest Diagnostics" className={inputCls} /></div>
                      <div><label className={labelCls}>Ordered by</label><input name="orderedBy" type="text" placeholder="e.g. Dr. Priya Mehta" className={inputCls} /></div>
                      <div><label className={labelCls}>Status</label>
                        <select name="status" defaultValue="Normal" className={inputCls}><option>Normal</option><option>Abnormal</option><option>Critical</option></select>
                      </div>
                    </div>
                  )}
                  {type === "visits" && (
                    <div className="space-y-3">
                      <div><label className={labelCls}>Doctor / Provider</label><input name="doctor" type="text" placeholder="e.g. Dr. Carlos Rivera" className={inputCls} required /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className={labelCls}>Specialty</label><input name="specialty" type="text" placeholder="e.g. Cardiology" className={inputCls} /></div>
                        <div><label className={labelCls}>Facility</label><input name="facility" type="text" placeholder="e.g. UCSF Medical" className={inputCls} /></div>
                      </div>
                      <div><label className={labelCls}>Diagnosis / Reason</label><input name="diagnosis" type="text" placeholder="e.g. Hypertension — initial diagnosis" className={inputCls} required /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className={labelCls}>Blood Pressure</label><input name="bp" type="text" placeholder="e.g. 120/80" className={inputCls} /></div>
                        <div><label className={labelCls}>Pulse</label><input name="pulse" type="text" placeholder="e.g. 72 bpm" className={inputCls} /></div>
                      </div>
                      <div><label className={labelCls}>Clinical Notes</label>
                        <textarea name="visitNotes" rows={3} placeholder="Notes from the visit…"
                          className="w-full px-3 py-2.5 rounded-lg border border-border bg-input-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                      </div>
                    </div>
                  )}
                  {type === "allergies" && (
                    <div className="space-y-3">
                      <div><label className={labelCls}>Allergen</label><input name="allergen" type="text" placeholder="e.g. Penicillin" className={inputCls} required /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className={labelCls}>Type</label>
                          <select name="allergyType" defaultValue="Medication" className={inputCls}><option>Medication</option><option>Food</option><option>Environmental</option><option>Other</option></select>
                        </div>
                        <div><label className={labelCls}>Severity</label>
                          <select name="severity" defaultValue="Mild" className={inputCls}><option>Mild</option><option>Moderate</option><option>Severe</option></select>
                        </div>
                      </div>
                      <div><label className={labelCls}>Reaction / Symptoms</label><input name="reaction" type="text" placeholder="e.g. Hives, difficulty breathing" className={inputCls} required /></div>
                      <div className="flex items-center gap-2">
                        <input name="flagged" type="checkbox" id="flag-allergy" className="rounded border-border" />
                        <label htmlFor="flag-allergy" className="text-sm text-foreground cursor-pointer">Flag as critical — alert all providers</label>
                      </div>
                    </div>
                  )}
                  <div><label className={labelCls}>Date</label>
                    <input name="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} className={inputCls} required />
                  </div>
                  {type === "prescriptions" && (
                    <div><label className={labelCls}>Additional Notes (optional)</label>
                      <textarea name="notes" rows={2} placeholder="Any additional context…"
                        className="w-full px-3 py-2.5 rounded-lg border border-border bg-input-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                    </div>
                  )}
                </>
              )}
              {saveError && (
                <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">{saveError}</div>
              )}
            </div>
            <div className="px-5 pb-5 pt-4 flex gap-2 justify-end border-t border-border">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors">Cancel</button>
              <button type="submit" disabled={saving || uploadMode === "upload"}
                className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 disabled:opacity-60">
                <CheckCircle2 size={14} /> {saving ? "Saving…" : "Save Record"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
