import { Flex, Box } from '@chakra-ui/react'
import { Filters } from '../components/Entries'

export const Entries = () => {
	return (
		<Flex>
			<Box w="20rem" size="9">
				<Filters />
			</Box>
			<Box flex="1">Box 3</Box>
		</Flex>
	)
}
