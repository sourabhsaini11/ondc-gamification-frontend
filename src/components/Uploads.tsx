import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from '@mui/material'
import axiosInstance from '@/lib/axiosInstance'
import { Download, Loader2 } from 'lucide-react'
import { useMutation, useQuery } from 'react-query'

const UserUploads = () => {
  const [page, setPage] = useState(1)

  const UPLOADS_QUERY_KEY = ['uploads', page]

  const fetchUploads = async () => {
    const token = localStorage.getItem('token')
    const res = await axiosInstance.get(`/api/v1/orders/uploads?page=${page}&limit=10`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  }

  const { data, isLoading, error } = useQuery({
    queryKey: UPLOADS_QUERY_KEY,
    queryFn: fetchUploads,
    staleTime: 5 * 60 * 1000,
  })

  const uploads = data?.data || []
  const totalPages = data?.pagination?.totalPages || 1

  const downloadCSVMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token')
      const res = await axiosInstance.get(`/api/v1/orders/download-csv`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      })
      return res.data
    },
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'uploads.csv')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    onError: (error) => {
      console.error('Error downloading CSV:', error)
    },
  })

  if (error) {
    console.error('Error fetching uploads:', error)
  }

  return (
    <Paper sx={{ p: 4, maxWidth: '93%', mx: 'auto', boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3, color: '#4077cf' }}>
        Uploads
      </Typography>

      {uploads.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#4077cf',
              color: 'white',
              fontWeight: 'bold',
              px: 3,
              py: 1.2,
              borderRadius: 2,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              '&:hover': { bgcolor: '#153075' },
            }}
            onClick={() => downloadCSVMutation.mutate()}
            disabled={downloadCSVMutation.isLoading}
            className="flex gap-2 items-center"
          >
            {downloadCSVMutation.isLoading ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
            <span>Export</span>
          </Button>
        </Box>
      )}

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100 }}>
          <Loader2 className="animate-spin" size={32} />
        </Box>
      ) : uploads.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: '#4077cf' }}>
                <TableRow>
                  {['Order ID', 'Game ID', 'Total Price', 'Status', 'Phone', 'Timestamp Created'].map((header) => (
                    <TableCell key={header} sx={{ color: 'white', fontWeight: 'bold' }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {uploads.map((order: any, index: any) => (
                  <TableRow key={order.id} sx={{ bgcolor: index % 2 === 0 ? '#fafafa' : 'white' }}>
                    <TableCell>{order.order_id}</TableCell>
                    <TableCell>{order.game_id.slice(0, 9)}...</TableCell>
                    {/* <TableCell>{order.name}</TableCell> */}
                    <TableCell>{order.total_price}</TableCell>
                    <TableCell>{order.order_status}</TableCell>
                    <TableCell>{order.uid}</TableCell>
                    <TableCell>{order.timestamp_created}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <PaginationControls page={page} totalPages={totalPages} setPage={setPage} />
        </>
      ) : (
        <Typography textAlign="center" color="gray">
          No uploads available.
        </Typography>
      )}
    </Paper>
  )
}

const PaginationControls = ({ page, totalPages, setPage }: { page: any; totalPages: any; setPage: any }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', mt: 3 }}>
    <Button
      variant="contained"
      sx={{ bgcolor: '#4077cf', '&:hover': { bgcolor: '#153075' } }}
      disabled={page === 1}
      onClick={() => setPage((prev: any) => Math.max(prev - 1, 1))}
    >
      Previous
    </Button>
    <Typography sx={{ color: '#4077cf', fontWeight: 'bold' }}>
      Page {page} of {totalPages}
    </Typography>
    <Button
      variant="contained"
      sx={{ bgcolor: '#4077cf', '&:hover': { bgcolor: '#153075' } }}
      disabled={page === totalPages}
      onClick={() => setPage((prev: any) => Math.min(prev + 1, totalPages))}
    >
      Next
    </Button>
  </Box>
)

export default UserUploads
