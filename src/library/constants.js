const AccessSrc = {
  LINE: 0,
  MOBILE: 1,
  IPAD: 2,
};

const Languages = {
  JP: 0,
  EN: 1,
};

const BookingStatus = {
  Completed: 1,
  Canceled: 2,
  Attended: 3,
  NoShow: 4,
  NoReservation: 5,
};

const AttendanceStatus = {
  Unconfirmed: 0,
  Attended: 1,
  NoShow: 2,
  Canceled: 3,
};

const CinemaAttendanceStatus = {
  Unconfirmed: 0,
  Attended: 1,
};

const WorkshopAttendanceStatus = {
  Unconfirmed: 0,
  Attended: 1,
};

const BookingType = {
  Normal: 0,
  Special: 1,
  VIP: 2,
};

const CouponType = {
  MOBILE: 0,
  LINE: 1,
};

const UniqueCodeType = {
  Referral: 0,
  Special: 1,
};

const Link = {
  DownloadBooking: 1,
};

const NotifType = {
  Mail: 0,
  PushNotif: 1,
};
const TaskDeclareStatus = {
  AwaitingConfirmation: 1,
  Approved: 2,
  Rejected: 3,
  Cancelled: 4,
};
const TransactionTypePointHistory = {
  Received: 1,
  Rejected: 2,
  Redeemed: 3,
  Adjusted: 4,
  CashIn: 5,
  Bonus: 6,
  Penalty: 7,
};
const HistorySouce = {
  TaskDeclare: 1,
  History: 2,
  Cancelled: 3,
};
const StatusType = {
  Active: 1,
  InActive: 0,
};

const BalanceTransferStatus = {
  Pending: 1,
  Approved: 2,
  Rejected: 3,
};

const SortType = {
  ASC: 0,
  DESC: 1,
};

const FilterFields = {
  intime: 0,
  date_registered: 1,
  prize_pts: 2,
};

const OrderStatus = {
  Applied: 1,
  Delivered: 2,
};

const Gender = {
  Male: 1,
  Female: 2
}

const InventoryType = {
  IN:1,
  OUT:2,
  REFUND:3
}

const OrdersType = {
  Order:1,
  Offer:2,
  Notification:3
}
/** **
 * START OF POITORE DEVELOPLMENT
 *
 *
 *
 */
module.exports = {
  BookingStatus,
  AttendanceStatus,
  BookingType,
  AccessSrc,
  Languages,
  CouponType,
  UniqueCodeType,
  WorkshopAttendanceStatus,
  Link,
  CinemaAttendanceStatus,
  NotifType,
  TaskDeclareStatus,
  TransactionTypePointHistory,
  HistorySouce,
  StatusType,
  BalanceTransferStatus,
  SortType,
  FilterFields,
  OrderStatus,
  Gender,
  InventoryType,
  OrdersType
};
