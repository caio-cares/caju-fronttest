import { Skeleton } from "primereact/skeleton";

import * as S from "../../pages/Dashboard/components/Columns/styles";

const SkeletonCard = () => {
  return (
    <S.Container>
      <S.Column status="REVIEW">
        <Skeleton width="10rem" height="4rem"></Skeleton>
      </S.Column>
      <S.Column status="APPROVED">
        <Skeleton width="10rem" height="4rem"></Skeleton>
      </S.Column>
      <S.Column status="REPROVED">
        <Skeleton width="10rem" height="4rem"></Skeleton>
      </S.Column>
    </S.Container>
  );
};

export default SkeletonCard;
