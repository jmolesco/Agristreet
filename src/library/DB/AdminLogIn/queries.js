const LogInDetails = `
SELECT
  staff_m.id,
  staff_m.fname,
  staff_m.lname, 
  staff_m.curr_pts,
  staff_m.total_pts,
  staff_m.staff_rank,
  rank_m.rank_name,
  rank_m.rank_percent,
  rank_m.rank_color
FROM staff_m
LEFT JOIN rank_m ON rank_m.id = staff_m.staff_rank
`;

module.exports = {
  LogInDetails,
};
