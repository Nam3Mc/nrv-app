import type { WeekDay } from "@/features/dashboard/utils/calendar.utils";

interface WeekDaySelectorProps {
    days: WeekDay[];
    selectedDate: string;
    onSelectDate: (date: string) => void;
}

export function WeekDaySelector({
    days,
    selectedDate,
    onSelectDate,
}: WeekDaySelectorProps) {
    return (
        <div className="grid grid-cols-7 gap-2">
            {days.map((day) => {
                const isSelected = day.isoDate === selectedDate;

                return (
                    <button
                        key={day.id}
                        type="button"
                        onClick={() => onSelectDate(day.isoDate)}
                        className={`rounded-2xl border px-2 py-3 text-center transition ${
                            isSelected
                                ? "border-primary bg-primary text-white shadow-sm"
                                : "border-border-subtle bg-surface-light text-primary hover:border-primary"
                        }`}
                    >
                        <span className="block text-xs font-bold">
                            {day.label}
                        </span>

                        <span className="mt-1 block text-lg font-bold">
                            {day.dayNumber}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}