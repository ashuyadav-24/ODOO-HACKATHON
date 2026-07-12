interface KPICardProps {
  title: string;
  value: string;
}

export default function KPICard({
  title,
  value,
}: KPICardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-gray-500 text-sm mb-2">
        {title}
      </h3>

      <p className="text-3xl font-bold text-blue-600">
        {value}
      </p>
    </div>
  );
}