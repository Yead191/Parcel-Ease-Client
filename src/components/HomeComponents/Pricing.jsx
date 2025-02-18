import { motion } from "framer-motion";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const pricingPlans = [
  { weight: "Below 1kg", price: "50 TK" },
  { weight: "1-2kg", price: "100 TK" },
  { weight: "More than 2kg", price: "150 TK" }
];

export default function Pricing() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-gray-800 mb-6"
        >
          Pricing Plans
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="overflow-x-auto"
        >
          <Table className="bg-white shadow-lg rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-200">
              <TableRow>
                <TableHead className="px-6 py-3 text-center text-gray-700 font-bold ">Weight</TableHead>
                <TableHead className="px-6 py-3  text-gray-700 font-bold">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingPlans.map((plan, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <TableCell className="px-6 py-4 text-gray-800 ">{plan.weight}</TableCell>
                  <TableCell className="px-6 py-4 text-gray-800 flex items-center gap-2 ">
                    <FaBangladeshiTakaSign className="text-green-500" />
                    {plan.price}
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-sm text-gray-500 mt-6"
        >
          1% COD charge will be applicable. This price/plan is exclusive of any VAT/TAX.
        </motion.p>
      </div>
    </section>
  );
}