import SpecialtiesManagementHeader from '@/components/modules/Admin/SpecialtiesManagement/SpecialtiesManagementHeader'
import SpecialtiesTable from '@/components/modules/Admin/SpecialtiesManagement/SpecialtiesTable'
import RefreshButton from '@/components/shared/RefreshButton'
import { TableSkeleton } from '@/components/shared/TableSkeleton'
import { getSpecialties } from '@/services/Admin/specialtiesManagement'
import { Suspense } from 'react'

const AdminSpecialtiesManagement = async () => {
  const result = await getSpecialties()
  return (
    <div className="space-y-6">
      <SpecialtiesManagementHeader />
      <div className="flex">
      </div>
      <div className="flex">
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <SpecialtiesTable specialties={result.data} />
      </Suspense>
    </div>
  )
}

export default AdminSpecialtiesManagement

/*
1. Call the - 
    a. Suspense from React
    b. theSpecialtiesTable.tsx just created
    c. TableSkeleton from components/shared/TableSkeleton
2. Make the React Component a Async-Await as I need to fetch the specialties data from getSpecialties server action file from services/Admin/specialtiesManagement
*/
