import { useEffect, useState } from 'react'
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

const UserUploads = () => {
  const [uploads, setUploads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axiosInstance.get(`/api/v1/orders/uploads?page=${page}&limit=10`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUploads(res.data.data)
        setTotalPages(res.data.pagination.totalPages)
      } catch (error) {
        console.error('Error fetching uploads:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUploads()
  }, [page])

  const downloadCSV = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axiosInstance.get(`/api/v1/orders/download-csv`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      })

      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'uploads.csv')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading CSV:', error)
    }
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
            onClick={downloadCSV}
            className="flex gap-2 items-center"
          >
            <Download size={20} />
            <span>Export</span>
          </Button>
        </Box>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100 }}>
          <Loader2 className='animate-spin' size={32} />
        </Box>
      ) : uploads.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: '#4077cf' }}>
                <TableRow>
                  {['Order ID', 'Name',  'Buyer',  'Total Price', , 'Status', 'Phone'].map(
                    (header) => (
                      <TableCell key={header} sx={{ color: 'white', fontWeight: 'bold' }}>
                        {header}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {uploads.map((order: any, index) => (
                  <TableRow key={order.id} sx={{ bgcolor: index % 2 === 0 ? '#fafafa' : 'white' }}>
                    <TableCell>{order.order_id}</TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.buyer_app_id}</TableCell>
                    <TableCell>{order.total_price}</TableCell>
                    <TableCell>{order.order_status}</TableCell>
                    <TableCell>{order.uid}</TableCell>
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

const PaginationControls = ({ page, totalPages, setPage }: any) => (
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