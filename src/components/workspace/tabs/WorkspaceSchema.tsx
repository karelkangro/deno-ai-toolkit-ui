export interface RuleSchemaField {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  enumValues?: string[];
}

export interface RuleSchema {
  schemaName: string;
  description: string;
  schemaVersion: string;
  fields: RuleSchemaField[] | Record<string, RuleSchemaField>;
}

export interface WorkspaceSchemaProps {
  schemaData?: RuleSchema;
  isLoading?: boolean;
  onCreateSchema?: (schema: Partial<RuleSchema>) => void;
  onEditSchema?: () => void;
  labels?: {
    noSchemaTitle?: string;
    noSchemaDescription?: string;
    createNewSchema?: string;
    schemaName?: string;
    schemaNamePlaceholder?: string;
    schemaDescription?: string;
    schemaDescriptionPlaceholder?: string;
    schemaVersion?: string;
    schemaVersionPlaceholder?: string;
    cancel?: string;
    createSchema?: string;
    editSchema?: string;
    schemaInformation?: string;
    version?: string;
    fieldCount?: string;
    schemaFields?: string;
    required?: string;
    allowedValues?: string;
    schemaValidation?: string;
    allRulesConform?: string;
    loadingWorkspace?: string;
    createSchemaComingSoon?: string;
  };
}

export const WorkspaceSchema = ({
  schemaData,
  isLoading = false,
  onCreateSchema,
  onEditSchema,
  labels = {},
}: WorkspaceSchemaProps) => {
  const defaultLabels = {
    noSchemaTitle: "No Schema Defined",
    noSchemaDescription:
      "Create a schema to define the structure of your workspace rules",
    createNewSchema: "Create New Schema",
    schemaName: "Schema Name",
    schemaNamePlaceholder: "Enter schema name",
    schemaDescription: "Description",
    schemaDescriptionPlaceholder: "Enter schema description",
    schemaVersion: "Version",
    schemaVersionPlaceholder: "1.0.0",
    cancel: "Cancel",
    createSchema: "Create Schema",
    editSchema: "Edit Schema",
    schemaInformation: "Schema Information",
    version: "Version",
    fieldCount: "Fields",
    schemaFields: "Schema Fields",
    required: "Required",
    allowedValues: "Allowed Values",
    schemaValidation: "Schema Validation",
    allRulesConform: "All rules must conform to this schema",
    loadingWorkspace: "Loading workspace...",
    createSchemaComingSoon: "Create schema functionality coming soon",
    ...labels,
  };

  const handleCreateSchema = () => {
    if (onCreateSchema) {
      onCreateSchema({});
    }
    // Create schema functionality not implemented yet
  };

  const handleEditSchema = () => {
    if (onEditSchema) {
      onEditSchema();
    }
    // Edit schema functionality not implemented yet
  };

  // Show loading state if loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="text-gray-600 mt-4">{defaultLabels.loadingWorkspace}</p>
        </div>
      </div>
    );
  }

  // Show schema creation if no schema exists
  if (!schemaData) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-8 mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {defaultLabels.noSchemaTitle}
          </h3>
          <p className="text-gray-600">{defaultLabels.noSchemaDescription}</p>
        </div>

        {/* Schema Creation Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            {defaultLabels.createNewSchema}
          </h4>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {defaultLabels.schemaName}
              </label>
              <input
                type="text"
                placeholder={defaultLabels.schemaNamePlaceholder}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {defaultLabels.schemaDescription}
              </label>
              <textarea
                placeholder={defaultLabels.schemaDescriptionPlaceholder}
                className="textarea textarea-bordered w-full h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {defaultLabels.schemaVersion}
              </label>
              <input
                type="text"
                placeholder={defaultLabels.schemaVersionPlaceholder}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button onClick={handleCreateSchema} className="btn btn-outline">
              {defaultLabels.cancel}
            </button>
            <button onClick={handleCreateSchema} className="btn btn-primary">
              {defaultLabels.createSchema}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const fields = Array.isArray(schemaData.fields)
    ? schemaData.fields
    : Object.values(schemaData.fields);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {schemaData.schemaName}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {schemaData.description || defaultLabels.schemaDescription}
          </p>
        </div>
        <button
          onClick={handleEditSchema}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          {defaultLabels.editSchema}
        </button>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {defaultLabels.schemaInformation}
            </h4>
            <p className="text-sm text-gray-700 mb-4">
              {schemaData.description || defaultLabels.schemaDescription}
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500">
                  {defaultLabels.schemaName}
                </p>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {schemaData.schemaName}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500">{defaultLabels.version}</p>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {schemaData.schemaVersion}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500">
                  {defaultLabels.fieldCount}
                </p>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {fields.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">
          {defaultLabels.schemaFields}
        </h4>

        <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
          {fields.map((field) => (
            <div
              key={field.name}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-sm font-medium text-gray-900">
                      {field.name}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                      {field.type}
                    </span>
                    {field.required && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">
                        {defaultLabels.required}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{field.description}</p>
                  {field.enumValues && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-1">
                        {defaultLabels.allowedValues}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {field.enumValues.map((value) => (
                          <span
                            key={value}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-gray-100 text-gray-700"
                          >
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex gap-3">
          <svg
            className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h5 className="text-sm font-medium text-yellow-900 mb-1">
              {defaultLabels.schemaValidation}
            </h5>
            <p className="text-sm text-yellow-800">
              {defaultLabels.allRulesConform}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
