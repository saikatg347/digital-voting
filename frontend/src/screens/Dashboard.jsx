import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCandidates, voteCandidate, resetVotes } from '../features/candidate/candidateActions'
import { useEffect } from 'react'
import Error from '../components/Error'

const Dashboard = () => {
	const { candidates, loading, error } = useSelector(
		(state) => state.candidates
	)

	const dispatch = useDispatch()

	useEffect(() => {
		if (candidates.length < 1) {
			dispatch(getAllCandidates())
		}
	}, [dispatch, candidates])

	const handleClick = (id) => {
		dispatch(voteCandidate(id))
	}

	if (loading) {
		return <h1>Loading...</h1>
	}

	return (
		<>
			<div>

			{error && <Error>{error}</Error>}
			</div>
			<button onClick={() => dispatch(resetVotes())}>Reset</button>
			<div className="candidate-container">
				{candidates?.map((candidate) => {
					return (
						<div key={candidate._id} className="candidate">
							<h2>{candidate.name}</h2>
							<h3>{candidate.votes}</h3>
							<button onClick={() => handleClick(candidate._id)}>Vote</button>
						</div>
					)
				})}
			</div>
		</>
	)
}

export default Dashboard
