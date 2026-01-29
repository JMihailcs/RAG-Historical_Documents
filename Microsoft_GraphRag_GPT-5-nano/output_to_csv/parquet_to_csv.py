import os
import shutil
import pandas as pd
import logging

# -----------------------------
# Configuración de logging
# -----------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

logger = logging.getLogger(__name__)

# -----------------------------
# Parámetros
# -----------------------------
output_path = "../output"
target_root = "."

parquet_files = []
other_files = []

logger.info("Escaneando archivos en output_path...")

# -----------------------------
# Escaneo previo (NO escribe nada)
# -----------------------------
for root, _, files in os.walk(output_path):
    for file in files:
        full_path = os.path.join(root, file)

        if file.endswith(".parquet"):
            parquet_files.append(full_path)
        else:
            other_files.append(full_path)

# -----------------------------
# Resumen al usuario
# -----------------------------
print("\n========== RESUMEN ==========")
print(f"Archivos PARQUET encontrados: {len(parquet_files)}")
for f in parquet_files:
    print(f"  [PARQUET] {f}")

print(f"\nOtros archivos encontrados: {len(other_files)}")
for f in other_files:
    print(f"  [OTRO] {f}")

print("=============================\n")

# -----------------------------
# Confirmación
# -----------------------------
response = input("¿Deseas continuar con la conversión y copia? (s / n): ").strip().lower()

if response != "s":
    logger.info("Proceso cancelado por el usuario.")
    print("Operación cancelada. No se realizaron cambios.")
    exit(0)

logger.info("Confirmación recibida. Iniciando procesamiento...")

# -----------------------------
# Proceso real
# -----------------------------
for root, _, files in os.walk(output_path):
    rel_path = os.path.relpath(root, output_path)
    target_dir = os.path.join(target_root, rel_path)

    os.makedirs(target_dir, exist_ok=True)

    for file in files:
        src_file = os.path.join(root, file)

        try:
            if file.endswith(".parquet"):
                logger.info(f"Convirtiendo PARQUET → CSV: {src_file}")

                df = pd.read_parquet(src_file)
                csv_name = file.replace(".parquet", ".csv")
                dst_file = os.path.join(target_dir, csv_name)

                df.to_csv(dst_file, index=False)

                logger.info(f"CSV generado: {dst_file}")

            else:
                dst_file = os.path.join(target_dir, file)
                shutil.copy2(src_file, dst_file)

                logger.info(f"Archivo copiado: {dst_file}")

        except Exception as e:
            logger.error(f"Error procesando {src_file}: {e}", exc_info=True)

logger.info("Proceso finalizado correctamente")
print("Proceso completado.")
