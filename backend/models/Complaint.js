const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    requestRef: {
      type: String,
      unique: true
    },
    categoryType: {
      type: String,
      required: true
    },
    organization: {
      type: String,
      required: true
    },
    solutionType: String,
    solutionName: String,
    medium: {
      type: String,
      required: true
    },
    mediumSource: {
      type: String,
      required: true
    },
    complaint: {
      type: String,
      required: true
    },

    // contact
    searchMobile: String,
    contactName: String,
    email: String,
    mobile: String,
    officeMobile: String,
    title: String,

    // organization contact person reference
    organizationContactPersonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrganizationContactPerson',
      default: null
    },

    // assignment
    assignment: String,
    docRef: String,
    docSubject: String,
    remarks: String,
  },
  { timestamps: true }
);

// Generate unique reference number before saving
complaintSchema.pre('save', async function(next) {
  if (!this.requestRef) {
    try {
      // Get current date in dd-mm-yy format
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = String(now.getFullYear()).slice(-2);
      const datePrefix = `${day}-${month}-${year}`;

      // Find the highest sequential number for today's date
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

      const lastComplaint = await mongoose.model('Complaint')
        .findOne(
          {
            requestRef: new RegExp(`^${datePrefix}-\\d{4}$`),
            createdAt: { $gte: todayStart, $lt: todayEnd }
          },
          { requestRef: 1 }
        )
        .sort({ requestRef: -1 })
        .limit(1);

      let nextNumber = 1;

      if (lastComplaint && lastComplaint.requestRef) {
        // Extract sequential number from reference (e.g., "08-07-25-0001" -> 1)
        const match = lastComplaint.requestRef.match(/-(\d{4})$/);
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }

      // Generate reference number like 08-07-25-0001, 08-07-25-0002, etc.
      this.requestRef = `${datePrefix}-${String(nextNumber).padStart(4, '0')}`;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;
