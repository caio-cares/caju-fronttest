import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import useRegistrations from "./hooks/useRegistrations";
import SkeletonCard from "~/components/Skeleton";

const DashboardPage = () => {
  const { fetch, users, status, error } = useRegistrations();

  return (
    <S.Container>
      <SearchBar handleRefresh={fetch} fetch={fetch} />
      {status === "loading" && <SkeletonCard />}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <Collumns registrations={users} refetch={() => fetch()} />
      )}
    </S.Container>
  );
};
export default DashboardPage;
