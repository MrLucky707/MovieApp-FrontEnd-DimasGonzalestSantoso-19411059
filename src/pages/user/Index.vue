<template>
 <q-page padding>
    <div class="q-mb-xl">
       <q-carousel
         animated
         v-model="slide"
         navigation
         infinite
         :autoplay="autoplay"
         arrows
         swipeable
         transition-prev="slide-right"
         transition-next="slide-left"
         @mouseenter="autoplay = false"
         @mouseleave="autoplay = true"
      >
         <q-carousel-slide :name="1" img-src="~assets/overlordb.png" />
         <q-carousel-slide :name="2" img-src="~assets/nysm2.png" />
         <q-carousel-slide :name="3" img-src="~assets/ngnl2.png" />
         <q-carousel-slide :name="4" img-src="~assets/ipman4b.png" />
         <q-carousel-slide :name="5" img-src="~assets/johnwick3b.png" />
         <q-carousel-slide :name="6" img-src="~assets/tanyab.jpg" />
         <q-carousel-slide :name="7" img-src="~assets/21jumpstreetb.png" />
         <q-carousel-slide :name="8" img-src="~assets/demonslayer.png" />
      </q-carousel>
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-md-3 col-xs-12" v-for="(movie, i) in data" :key="i">
         <q-card>
              <q-img :src="`${$baseImageURL}/${movie.image}`" :ratio="16/9" />

            <q-card-section>
            <q-btn
               fab
               color="primary"
               icon="add_shopping_cart"
               class="absolute"
               unevelevated
               style="top: 0; right: 12px; transform: translateY(-50%);"
            />

            <div class="row no-wrap items-center">
               <div class="col text-h6 ellipsis">
                  {{ movie.judulFilm }}
               </div>
            </div>

            <q-rating v-model="movie.rating" readonly color="orange-5" :max="5" size="32px" />
            </q-card-section>

            <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
                  Rp.{{ movie.harga }},-
                </div>
                <div class="text-subtitle1">
                  {{ movie.genre }}
                </div>
            <div @click="movie.expanded = !movie.expanded" class="text-caption text-grey-10 cursor-pointer">
                  Tampilkan Sinopsis
                </div>
                <q-slide-transition>
                  <div v-show="movie.expanded">
                    <div class="text-grey text-caption" style="text-align:justify;">
                      {{ movie.deskripsi }}
                    </div>
                  </div>
                </q-slide-transition>
            </q-card-section>

            <q-card-actions>
            <q-btn unelevated @click="openDetail(movie)" class="full-width" color="indigo-10">
                  Order Now!
            </q-btn>
            </q-card-actions>
         </q-card>
      </div>
    </div>
    <q-dialog v-model="dialog" v-if="dialog" position="bottom">
      <q-card style="width: 500px">
         <q-card-section>
            <div class="text-h6">Detail Pemesanan</div>
         </q-card-section>
         <q-card-section style="max-height: 50vh;" class="scroll">
            {{ activeData.judulFilm }} - Rp.{{ activeData.harga }},-
            <q-form class="q-mt-md">
               <q-input filled type="number" class="q-mb-md" v-model="jumlah" label="Masukkan Jumlah"/>
               Rp.{{ total }},-
                <q-file color="teal" class="q-mt-md" v-model="image" filled label="Upload Bukti Pembayaran">
                  <template v-slot:prepend>
                  <q-icon name="upload" />
               </template>
               </q-file>
            </q-form>
         </q-card-section>
         <q-card-actions align="right">
            <q-btn flat label="Batal" v-close-popup/>
            <q-btn color="indigo-10" @click="prosesTransaksi" label="Proses"/>
         </q-card-actions>
      </q-card>
    </q-dialog>
 </q-page>
</template>
<script>
export default {
  data () {
    return {
      slide: 1,
      autoplay: true,
      stars: 4,
      dialog: false,
      data: [],
      image: null,
      activeData: null,
      jumlah: 1
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('movie/getall')
        .then(res => {
          if (res.data.sukses) {
            this.data = res.data.data.map(movie => {
              return Object.assign(movie, {
                expanded: false
              })
            })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    },
    openDetail (data) {
      this.activeData = data
      this.dialog = true
    },
    prosesTransaksi () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify({
        idUser: this.$q.localStorage.getItem('dataUser')._id,
        idFilm: this.activeData._id,
        harga: this.activeData.harga,
        jumlah: this.jumlah,
        total: this.total
      }))
      this.$axios.post('order/insert', formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.dialog = false
            this.image = null
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  },
  computed: {
    total () {
      return this.activeData.harga * this.jumlah
    }
  }
}
</script>
