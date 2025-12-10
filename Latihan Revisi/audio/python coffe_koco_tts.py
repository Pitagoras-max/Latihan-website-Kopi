import asyncio
import edge_tts

async def main():
    text = """Selamat datang di Coffe Koco…
Tempat hangat untuk setiap cerita dan cangkir kopi terbaik pilihanmu.
Dari aroma kopi yang khas, suasana yang nyaman, hingga senyum ramah yang selalu menyambutmu…
Coffe Koco hadir untuk menemani setiap momen, dari pagi yang sibuk hingga malam yang santai.
Coffe Koco — lebih dari sekadar kopi, ini tentang rasa yang menyatukan."""
    
    # Pilih suara perempuan Indonesia
    voice = "id-ID-GadisNeural"
    output_file = "promosi_coffe_koco.mp3"

    tts = edge_tts.Communicate(text, voice)
    await tts.save(output_file)
    print(f"Audio berhasil disimpan ke {output_file}")

if __name__ == "__main__":
    asyncio.run(main())
