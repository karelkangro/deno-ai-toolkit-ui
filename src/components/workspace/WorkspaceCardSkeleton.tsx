export const WorkspaceCardSkeleton = () => {
  return (
    <div className="card card-side bg-base-100 shadow-sm w-full max-w-2xl">
      <figure>
        <div className="skeleton w-32 h-32"></div>
      </figure>
      <div className="card-body">
        {/* Title skeleton */}
        <div className="skeleton h-6 w-3/4 mb-2"></div>

        {/* Description skeleton */}
        <div className="skeleton h-4 w-full mb-2"></div>
        <div className="skeleton h-4 w-2/3 mb-4"></div>

        {/* Stats skeleton */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <div className="skeleton h-4 w-16"></div>
            <div className="skeleton h-4 w-20"></div>
          </div>
          <div className="flex justify-between">
            <div className="skeleton h-4 w-16"></div>
            <div className="skeleton h-4 w-8"></div>
          </div>
          <div className="flex justify-between">
            <div className="skeleton h-4 w-16"></div>
            <div className="skeleton h-4 w-8"></div>
          </div>
          <div className="flex justify-between">
            <div className="skeleton h-4 w-16"></div>
            <div className="skeleton h-4 w-20"></div>
          </div>
        </div>

        {/* Action buttons skeleton */}
        <div className="justify-end card-actions">
          <div className="skeleton h-10 w-16"></div>
          <div className="skeleton h-10 w-16"></div>
          <div className="skeleton h-10 w-16"></div>
        </div>
      </div>
    </div>
  );
};
