const headTitles = [
  {
    id: 0,
    styling: "w-[8%] text-[17px] text-center",
    title: "Investor ID",
  },
  { id: 1, styling: "w-[8%] text-[17px] text-center", title: "Investor Name" },
  { id: 2, styling: "w-[8%] text-[17px] text-center", title: "Phone Number" },
  { id: 3, styling: "w-[8%] text-[17px] text-center", title: "CNIC" },
  { id: 4, styling: "w-[8%] text-[17px] text-center", title: "Update" },
  { id: 4, styling: "w-[8%] text-[17px] text-center", title: "Remove" },
  { id: 4, styling: "w-[8%] text-[17px] text-center", title: "Add Amount" },
  { id: 4, styling: "w-[8%] text-[17px] text-center", title: "Amount Details" },
];

const investorData = [
  {
    trackingID: 123123123,
    investorData: [
      {
        investorID: 0,
        investorName: "testing",
        phoneNumber: "8128381293",
        CNIC: "123123",
      },
      {
        investorID: 1,
        investorName: "testing",
        phoneNumber: "8128381293",
        CNIC: "123123",
      },
    ],
  },
];



export { headTitles, investorData };
