export const dashboardConfig = {
  filters: {
    mood: [
      { value: 'Happy', label: 'Happy' },
      { value: 'Anxious', label: 'Anxious' },
      { value: 'Calm', label: 'Calm' },
      { value: 'Neutral', label: 'Neutral' },
      { value: 'Excited', label: 'Excited' },
    ],
    lucidStatus: [
      { value: 'true', label: 'Lucid Dreams' },
      { value: 'false', label: 'Regular Dreams' },
    ],
  },
  sorting: {
    options: [
      { value: 'created_at_desc', label: 'Newest First' },
      { value: 'created_at_asc', label: 'Oldest First' },
      { value: 'dream_date_desc', label: 'Dream Date (Recent)' },
      { value: 'dream_date_asc', label: 'Dream Date (Oldest)' },
    ],
    default: 'created_at_desc',
  },
  pagination: {
    pageSize: 12,
  },
};

export const FREE_TIER_INSIGHTS_LIMIT = 5;
export const PREMIUM_PRICE = 8; // $8/month
