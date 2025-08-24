export function FilterList( list,sortCriteria ){
    if (sortCriteria === "all") return list;
    return list.filter((item)=> item.status == sortCriteria )
}

export function FilterProjectList(list,criteria){
    let sortedlist = FilterList(list,criteria.status)
    if (criteria.date === "descending") 
        return sortedlist.toSorted(( a,b ) => new Date(b.createdAt) - new Date(a.createdAt) );
    return sortedlist.toSorted(( a,b ) => new Date(a.createdAt) - new Date(b.createdAt) );
}