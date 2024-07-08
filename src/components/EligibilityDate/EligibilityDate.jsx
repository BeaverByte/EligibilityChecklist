import { motion } from "framer-motion";

export default function EligibilityDate({ eligibilityDate, className }) {
  return (
    <div className={className} key={eligibilityDate}>
      <motion.p
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {eligibilityDate}
      </motion.p>
    </div>
  );
}
