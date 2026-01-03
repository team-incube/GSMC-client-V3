import { skipToken, useQuery } from "@tanstack/react-query"
import { getPercentScore, getPercentScoreRequest } from "../api/getPercentScore"

export const useGetPercentScore = ({ type }: getPercentScoreRequest) => {
    return useQuery({
        queryKey: ["percent", "score", type],
        queryFn: type ? () => getPercentScore({ type }) : skipToken,
    })
}