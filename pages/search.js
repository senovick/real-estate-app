import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';

import Property from '../components/Property';
import SearchFilters from '../components/SearchFilters';
import noresult from '../assets/images/noresult.svg'
import { propertiesForRent, propertiesForSale } from '../data/properties';

const Search = ({ properties }) => {
    const [searchFilters, setSearchFilters] = useState(false);
    const router = useRouter();

    return (
        <Box>
            <Flex
                onClick={() => setSearchFilters(!searchFilters)}
                cursor='pointer'
                bg='gray.100'
                borderBottom='1px'
                borderColor='gray.200'
                p='2'
                fontWeight='black'
                fontSize='lg'
                justifyContent='center'
                alignItems='center'
            >
            <Text>Search Property By Filters</Text>
            <Icon paddingLeft='2' w='7' as={BsFilter} />
        </Flex>
        {searchFilters && <SearchFilters />}
        <Text fontSize='2xl' p='4' fontWeight='bold'>
            Properties {router.query.purpose}
        </Text>
        <Flex flexWrap='wrap'>
        {properties.map((property) => <Property property={property} key={property.id} />)}
        </Flex>
        {properties.length === 0 && (
            <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5'>
            <Image src={noresult} alt='' />
            <Text fontSize='xl' marginTop='3'>No Result Found.</Text>
            </Flex>
        )}        
        </Box>
    )
};

export async function getServerSideProps({ query }) {
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const data = purpose === 'for-rent' ? propertiesForRent : propertiesForSale;
  
    return {
      props: {
        properties: data?.hits.filter((p) => {
            return p.baths >= bathsMin ||
                   p.rentFrequency == rentFrequency ||
                   p.price >= minPrice ||
                   p.price <= maxPrice ||
                   p.rooms >= roomsMin ||
                   p.area <= areaMax; 
        }),
      },
    };
  }
  
  export default Search;