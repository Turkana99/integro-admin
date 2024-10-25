const apiUrl = 'https://api.integrolaw.az/api/v1'; // Example API endpoint

export const environment = {
  loginUrl: `${apiUrl}/Auth/Login`,
  resetPass: `${apiUrl}/Auth/ResetPassword`,
  blogs: `${apiUrl}/Blogs`,
  blogAttachment: `${apiUrl}/Blogs/DeleteAttachment`,
  contacts: `${apiUrl}/Contacts`,
  employees: `${apiUrl}/Employees`,
  homePages: `${apiUrl}/HomePages`,
  pageSettings: `${apiUrl}/PageSettings`,
  pageSettingsType: `${apiUrl}/PageSettings/getPageTypes`,
  feedbacks: `${apiUrl}/FeedbackAndSuggestions`,
  partners: `${apiUrl}/Partners`,
  services: `${apiUrl}/Services`,
  about: `${apiUrl}/Abouts`,
  evaluate: `${apiUrl}/CaseEvaluations`,
};
