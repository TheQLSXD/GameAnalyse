import { cn } from "@/lib/utils";

// Empty component
export function Empty({ message = "暂无数据", className = "" }: { message?: string; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-gray-400 py-12", className)}>
      <div className="w-24 h-24 bg-gray-100/10 rounded-full flex items-center justify-center mb-4">
        <i className="fa-solid fa-box-open text-3xl"></i>
      </div>
      <p>{message}</p>
    </div>
  );
}