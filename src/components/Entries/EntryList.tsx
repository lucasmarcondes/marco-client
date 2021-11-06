import { Entry } from '../../components/entries'
import { Entry as EntryType } from '../../types'

type EntryListProps = {
	entries: Array<EntryType>
	searchedText: string
}

export const EntryList = ({ entries, searchedText }: EntryListProps) => {
	return (
		<div>
			{entries.map((val, index) => (
				<Entry key={index} entry={val} index={index} searchedText={searchedText} />
			))}
		</div>
	)
}
