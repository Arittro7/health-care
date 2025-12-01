import DoctorsManagementHeader from '@/components/modules/Admin/DoctorsManagement/DoctorsManagementHeader'
import RefreshButton from '@/components/shared/RefreshButton'
import SearchFilter from '@/components/shared/SearchFilter'
import SelectFilter from '@/components/shared/SelectFilter'
import { getSpecialties } from '@/services/Admin/specialtiesManagement'
import { ISpecialty } from '@/types/specialties.interface'
import { Suspense } from 'react'

const AdminDoctorsManagementPage = async () => {
  const specialtiesResult = await getSpecialties()
  return (
    <div className="space-y-6">
      <DoctorsManagementHeader />
      <div className="flex">
      </div>
      <div className="flex">
        <SearchFilter paramName="searchTerm" placeholder="Search doctors..." />
        <SelectFilter
          paramName="specialty" // ?specialty="Cardiology"
          options={specialtiesResult.data.map((specialty: ISpecialty) => ({
            label: specialty.title,
            value: specialty.title,
          }))}
          placeholder="Filter by specialty"
        />
        <RefreshButton />
      </div>
      {/* <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <SpecialtiesTable specialties={result.data} />
      </Suspense> */}
      {/* will add later */}
    </div>
  )
}

export default AdminDoctorsManagementPage

/*
1. Call the - 
    a. Suspense from React
    b. theSpecialtiesTable.tsx just created
    c. TableSkeleton from components/shared/TableSkeleton
2. Make the React Component a Async-Await as I need to fetch the specialties data from getSpecialties server action file from services/Admin/specialtiesManagement
*/
