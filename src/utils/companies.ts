export const getAllCompanies = async () => {
  const res = await fetch(
    "https://technl-job-listing-scraper.herokuapp.com/companies"
  );
  const companies: string[] = await res.json();
  return companies;
};
