import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { RESULTS_PER_PAGE } from "../../utilities/constants";

function useGetBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // Filtered Booking
  const filterValue = searchParams.get("status");

  // if there are multiple filtering options

  // const filter =
  //   !filterValue || filterValue === "all"
  //     ? null
  //     : [
  //         {
  //           field: "status",
  //           value: filterValue,
  //           method: "eq",
  //         },
  //         {
  //           field: "totalPrice",
  //           value: 5000,
  //           method: "gte",
  //         },
  //       ];

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
          method: "eq",
        };

  // Sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };

  // Query
  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Prefetching the data
  const totalPage = Math.ceil(count / RESULTS_PER_PAGE);

  if (page < totalPage)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, error, bookings, count };
}

export default useGetBookings;
