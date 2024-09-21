import { inputTypes } from "@/app/utils/constants";

const defaultObject = {
  investor_amount: "",
  investor_amount_type: "",
  investor_amount_date: "",
};
const API = {
  endpoint: "users/investors/addAmount",
  method: "POST",
};

const purchaseDefaultObject = {
  vehicle_company: "",
  vehicle_type: "",
  vehicle_registration_no: "",
  vehicle_chases_no: "",
  vehicle_model: "",
  vehicle_meter_reading: "",
  purchase_date: "",
};

const purchaseAPI = {
  endpoint: "users/investors/addPurchase",
  method: "POST",
};

const sellDefaultObject = {
  sell_by: "",
  selling_date: "",
  selling_price: "",
  sell_amount: "",
};
const sellAPI = {
  endpoint: "users/investors/addSell",
  method: "POST",
};

const extraExpenseDefaultObject = {
  workshop_name: "",
  date_modified: "",
  total_expense: "",
  detail: "",
  other_expense: "",
};
const extraExpenseAPI = {
  endpoint: "users/investors/addExtraExpense",
  method: "POST",
};

function moduleInputItems(module: any, state: any) {
  if (module === "amountModule") {
    return [
      {
        type: "number",
        label: "Amount",
        name: "investor_amount",
        value: state.investor_amount,
      },
      {
        type: "date",
        label: "Date",
        name: "investor_amount_date",
        value: state.investor_amount_date,
      },
    ];
  }
  if (module === "purchaseModule") {
    return [
      {
        type: "text",
        label: "Vehicle Company",
        name: "vehicle_company",
        value: state.vehicle_company,
      },
      {
        type: "text",
        label: "Vehicle Type",
        name: "vehicle_type",
        value: state.vehicle_type,
      },
      {
        type: "number",
        label: "Vehicle Registration No.",
        name: "vehicle_registration_no",
        value: state.vehicle_registration_no,
      },
      {
        type: "number",
        label: "Vehicle Chases No.",
        name: "vehicle_chases_no",
        value: state.vehicle_chases_no,
      },
      {
        type: "text",
        label: "Vehicle Model",
        name: "vehicle_model",
        value: state.vehicle_model,
      },
      {
        type: "number",
        label: "Vehicle Meter Reading",
        name: "vehicle_meter_reading",
        value: state.vehicle_meter_reading,
      },
      {
        type: "date",
        label: "Purchase Date",
        name: "purchase_date",
        value: state.purchase_date,
      },
    ];
  }
  if (module === "sellModule") {
    return [
      {
        type: "text",
        label: "Sell By",
        name: "sell_by",
        value: state?.sell_by,
      },
      {
        type: "date",
        label: "Selling Date",
        name: "selling_date",
        value: state?.selling_date,
      },
      {
        type: "number",
        label: "Selling Price",
        name: "selling_price",
        value: state?.selling_price,
      },

      {
        type: "number",
        label: "Sell Amount",
        name: "sell_amount",
        value: state?.sell_amount,
      },
    ];
  }

  if (module === "extraExpenseModule") {
    return [
      {
        type: "text",
        label: "Workshop Name",
        name: "workshop_name",
        value: state?.workshop_name,
      },
      {
        type: "date",
        label: "Date Modified",
        name: "date_modified",
        value: state?.date_modified,
      },
      {
        type: "number",
        label: "Total Expense",
        name: "total_expense",
        value: state?.total_expense,
      },
      {
        type: inputTypes.textarea,
        label: "Detail",
        name: "detail",
        value: state?.detail,
      },
      {
        type: inputTypes.textarea,
        label: "Other Expense",
        name: "other_expense",
        value: state?.other_expense,
      },
    ];
  }
}

export {
  defaultObject,
  API,
  purchaseDefaultObject,
  purchaseAPI,
  sellDefaultObject,
  sellAPI,
  extraExpenseDefaultObject,
  extraExpenseAPI,
  moduleInputItems
};
