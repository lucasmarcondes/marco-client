import { Heading, Flex, Stack, RadioGroup, Radio, Checkbox, Tag, TagLabel, TagLeftIcon, Text, Input } from '@chakra-ui/react'
import { BsX } from 'react-icons/bs'

export const Filters = () => {
	return (
		<>
			<Heading as="h2" size="md" mb={1}>
				Sort by
			</Heading>
			<RadioGroup mb="4" defaultValue={1}>
				<Stack spacing={0}>
					<Radio value="1">Newest First</Radio>
					<Radio value="2">Oldest First</Radio>
				</Stack>
			</RadioGroup>
			<Heading as="h2" size="md" mb={1}>
				Templates
			</Heading>
			<Stack spacing={0} mb="4">
				{[...new Array(4)].map((val, index) => {
					return <Checkbox key={index}>Template {index + 1}</Checkbox>
				})}
			</Stack>
			<Heading as="h2" size="md" mb={1}>
				Properties
			</Heading>
			<Flex wrap="wrap" mb={4}>
				{[...new Array(5)].map((val, index) => {
					return (
						<Tag key={index} m={1} colorScheme="gray" size="md" borderRadius="full">
							<TagLeftIcon boxSize={15} as={BsX} marginEnd={0.5} />
							<TagLabel>Property {index + 1}</TagLabel>
						</Tag>
					)
				})}
			</Flex>
			<Heading as="h2" size="md" mb={1}>
				Dates
			</Heading>
			<Text as="label" htmlFor="beginDate">
				Begin
			</Text>
			<Input id="beginDate" type="datetime-local" mb={2} />
			<Text as="label" htmlFor="endDate">
				End
			</Text>
			<Input id="endDate" type="datetime-local" />
		</>
	)
}
