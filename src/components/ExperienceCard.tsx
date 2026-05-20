type ExperienceCardProps = {
  title: string;
  company: string;
  year: string;
  description: string;
  achievements: string[];
  hideYear?: boolean;
};

export function ExperienceCard({
  title,
  company,
  year,
  description,
  achievements,
  hideYear = false,
}: ExperienceCardProps) {
  return (
    <div className="experience-card-panel flex flex-col p-4 sm:p-6 bg-muted-100/95 dark:bg-muted-900/90 border border-muted-300/80 dark:border-muted-700 rounded-2xl shadow-[0_4px_24px_-6px_rgba(28,25,23,0.1)] dark:shadow-[0_8px_28px_-8px_rgba(0,0,0,0.35)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary-400/45 dark:hover:border-primary-500/40">
      <div className="flex shrink-0 flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 gap-2">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-muted-900 dark:text-muted-50 mb-1">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-primary-600 dark:text-primary-400 font-medium">
            {company}
          </p>
        </div>
        {!hideYear && (
          <span className="font-mono text-xs sm:text-sm text-muted-500 dark:text-muted-400 shrink-0 tabular-nums">
            {year}
          </span>
        )}
      </div>
      <p className="text-sm sm:text-base text-muted-700 dark:text-muted-300 mb-3 sm:mb-4 leading-relaxed shrink-0">
        {description}
      </p>
      <ul className="space-y-1.5 sm:space-y-2">
        {achievements.map((achievement, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-xs sm:text-sm text-muted-600 dark:text-muted-400"
          >
            <span className="text-primary-600 dark:text-primary-400 mt-0.5 sm:mt-1 flex-shrink-0">
              ▸
            </span>
            <span>{achievement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
