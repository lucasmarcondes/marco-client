import { ReactNode } from 'react'
import { NavLink as RouterLink, useLocation, match } from 'react-router-dom'
import { Box, Flex, Avatar, HStack, Link, IconButton, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorMode, useColorModeValue, Stack } from '@chakra-ui/react'
import { BsList, BsX, BsSunFill, BsMoonFill } from 'react-icons/bs'

const Links = ['Entries', 'Templates', 'Analytics']

const NavLink = ({ children }: { children: ReactNode }) => (
	<Link
		as={RouterLink}
		px={2}
		py={1}
		rounded={'md'}
		_hover={{
			textDecoration: 'none',
			bg: useColorModeValue('gray.200', 'gray.700'),
		}}
		activeStyle={{ fontWeight: 'bold' }}
		to={`/${children?.toString().toLowerCase()}`}
	>
		{children}
	</Link>
)

export const Header = () => {
	let location = useLocation()
	if (location.pathname.startsWith('/login')) return null

	const { colorMode, toggleColorMode } = useColorMode()
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<Box
			bg={useColorModeValue('white', 'gray.800')}
			color={useColorModeValue('gray.600', 'white')}
			minH={'60px'}
			px={{ base: 4 }}
			borderBottom={1}
			borderStyle={'solid'}
			borderColor={useColorModeValue('gray.200', 'gray.900')}
			align={'center'}
		>
			<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
				<IconButton size={'md'} icon={isOpen ? <BsX /> : <BsList />} aria-label={'Open Menu'} display={{ md: 'none' }} onClick={isOpen ? onClose : onOpen} />
				<HStack spacing={8} alignItems={'center'}>
					<Box fontWeight={'bold'}>marco</Box>
					<HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
						{Links.map((link) => (
							<NavLink key={link}>{link}</NavLink>
						))}
					</HStack>
				</HStack>
				<Flex alignItems={'center'}>
					<Button background="transparent" mr="2" onClick={toggleColorMode}>
						{colorMode === 'light' ? <BsMoonFill /> : <BsSunFill />}
					</Button>
					<Menu>
						<MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
							<Avatar size={'sm'} />
						</MenuButton>
						<MenuList>
							<MenuItem as={RouterLink} to="/profile">
								Profile
							</MenuItem>
							<MenuDivider />
							<MenuItem as={RouterLink} to="/logout">
								Logout
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</Flex>
			{isOpen ? (
				<Box pb={4} display={{ md: 'none' }}>
					<Stack as={'nav'} spacing={4}>
						{Links.map((link) => (
							<NavLink key={link}>{link}</NavLink>
						))}
					</Stack>
				</Box>
			) : null}
		</Box>
	)
}
