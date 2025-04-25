interface StatCardProps {
  number: string
  label: string
  bgColor: string
  textColor: string
}

export default function StatCard({ number, label, bgColor, textColor }: StatCardProps) {
  return (
    <div
      className={`${bgColor} ${textColor} p-8 text-center rounded-lg shadow-lg transition-transform hover:scale-105`}
    >
      <div className="text-6xl md:text-7xl font-bold mb-2">{number}</div>
      <div className="text-xl font-medium">{label}</div>
    </div>
  )
}
