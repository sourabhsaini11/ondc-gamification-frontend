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
} from '@mui/material'
import axiosInstance from '@/lib/axiosInstance'

const UserUploads = () => {
  const [uploads, setUploads] = useState<any[]>([])
  const [loading, setLoading] = useState<any>(true)
  const [page, setPage] = useState<any>(1)
  const [totalPages, setTotalPages] = useState<any>(1)

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axiosInstance.get(`/api/v1/orders/uploads?page=${page}&limit=10`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        console.log('Response 🚨: ', res.data)
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

  return (
    <Paper sx={{ p: 4, maxWidth: '93%', mx: 'auto', boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3, color: '#4077cf' }}>
        Uploads
      </Typography>

      {loading ? (
        <Typography textAlign="center" color="gray">
          Loading uploaded data...
        </Typography>
      ) : uploads.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: '#4077cf' }}>
                <TableRow>
                  {['Order ID', 'Name', 'Category', 'Buyer', 'Seller', 'Base Price', 'Discount', 'Status', 'Phone'].map(
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
                    <TableCell>{order.category}</TableCell>
                    <TableCell>{order.buyer_app_id}</TableCell>
                    <TableCell>{order.seller_id}</TableCell>
                    <TableCell>{order.base_price}</TableCell>
                    <TableCell>{order.discount}</TableCell>
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
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '20px' }}>
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
  </div>
)

export default UserUploads