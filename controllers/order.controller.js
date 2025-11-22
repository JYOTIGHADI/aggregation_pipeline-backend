import Order from "../models/order.moldel.js";

export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: "Order created", data: order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const q1 = async (req, res) => {
  const data = await Order.aggregate([
    { $match: { status: "Delivered", paymentMethod: "UPI" } }
  ]);
  res.json(data);
};



export const q2 = async (req, res) => {
  const data = await Order.aggregate([{ $unwind: "$items" }]);
  res.json(data);
};


export const q3 = async (req, res) => {
  const data = await Order.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: "$customerId",
        totalOrders: { $sum: 1 },
        totalAmount: { $sum: { $multiply: ["$items.price", "$items.qty"] } }
      }
    }
  ]);
  res.json(data);
};



export const q4 = async (req, res) => {
  const data = await Order.aggregate([
    {
      $project: {
        _id: 0,
        customerName: 1,
        totalItems: { $sum: "$items.qty" },
        orderDate: 1,
        city: "$location.city"
      }
    }
  ]);
  res.json(data);
};



export const q5 = async (req, res) => {
  const data = await Order.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: "$customerId",
        totalSpent: { $sum: { $multiply: ["$items.price", "$items.qty"] } }
      }
    },
    { $sort: { totalSpent: -1 } },
    { $limit: 3 }
  ]);
  res.json(data);
};


export const q6 = async (req, res) => {
  const data = await Order.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.product",
        totalSold: { $sum: "$items.qty" }
      }
    },
    { $sort: { totalSold: -1 } },
    { $limit: 1 }
  ]);
  res.json(data);
};



export const q7 = async (req, res) => {
  const data = await Order.aggregate([
    { $match: { "location.city": "Mumbai" } },
    { $unwind: "$items" },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: { $multiply: ["$items.price", "$items.qty"] } }
      }
    }
  ]);
  res.json(data);
};



export const q8 = async (req, res) => {
  const data = await Order.aggregate([
    {
      $lookup: {
        from: "customers",
        localField: "customerId",
        foreignField: "customerId",
        as: "customerDetails"
      }
    }
  ]);
  res.json(data);
};


export const q9 = async (req, res) => {
  const data = await Order.aggregate([
    {
      $facet: {
        deliveredOrdersCount: [
          { $match: { status: "Delivered" } },
          { $count: "totalDelivered" }
        ],
        paymentSummary: [
          {
            $group: {
              _id: "$paymentMethod",
              totalOrders: { $sum: 1 }
            }
          }
        ]
      }
    }
  ]);
  res.json(data);
};


export const q10 = async (req, res) => {
  const data = await Order.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: "$customerId",
        customerName: { $first: "$customerName" },
        city: { $first: "$location.city" },
        lastOrderDate: { $max: "$orderDate" },
        totalAmount: { $sum: { $multiply: ["$items.price", "$items.qty"] } },
        totalItems: { $sum: "$items.qty" },
        mostExpensive: { $max: "$items.price" }
      }
    },
    { $sort: { totalAmount: -1 } }
  ]);
  res.json(data);
};
