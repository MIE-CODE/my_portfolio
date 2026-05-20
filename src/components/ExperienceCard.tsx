type ExperienceCardProps = {
  title: string;
  company: string;
  year: string;
  description: string;
  achievements: string[];
};

export function ExperienceCard({
  title,
  company,
  year,
  description,
  achievements,
}: ExperienceCardProps) {
  return (
    <div
      data-stack-panel
      className="experience-card-panel flex h-full flex-col p-4 sm:p-6 bg-white/95 dark:bg-muted-800/90 border border-muted-200/95 dark:border-muted-700 rounded-2xl shadow-[0_8px_32px_rgba(28,25,23,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
    >
      <div className="flex shrink-0 flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-muted-900 dark:text-muted-50 mb-1">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-primary-600 dark:text-primary-400 font-medium">
            {company}
          </p>
        </div>
        <span className="text-xs sm:text-sm text-muted-600 dark:text-muted-400 mt-2 sm:mt-0 shrink-0">
          {year}
        </span>
      </div>
      <p className="text-sm sm:text-base text-muted-700 dark:text-muted-300 mb-3 sm:mb-4 leading-relaxed shrink-0">
        {description}
      </p>
      <ul className="min-h-0 flex-1 space-y-1.5 overflow-y-auto sm:space-y-2">
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
